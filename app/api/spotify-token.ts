// pages/api/spotify-token.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  accessToken?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const authOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ accessToken: data.access_token });
    } else {
      res.status(response.status).json({ error: data.error_description || 'Failed to retrieve access token' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
