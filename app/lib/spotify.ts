export async function getSpotifyArtist(artistName: string) {
  const tokenResponse = await fetch('/api/spotify-token');

  if (!tokenResponse.ok) {
    throw new Error('Failed to fetch access token');
  }

  let tokenData;
  try {
    tokenData = await tokenResponse.json();
  } catch (err) {
    throw new Error('Failed to parse token response');
  }

  if (!tokenData.accessToken) {
    throw new Error('Access token is missing in the response');
  }

  const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
    headers: {
      Authorization: `Bearer ${tokenData.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.artists && data.artists.items && data.artists.items.length > 0) {
    return data.artists.items[0];
  } else {
    throw new Error('No artists found');
  }
}
