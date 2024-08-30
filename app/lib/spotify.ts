export async function searchSpotifyArtists(artistName: string) {
  const tokenResponse = await fetch('/api/spotify-token');

  if (!tokenResponse.ok) {
    throw new Error('Failed to fetch access token');
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.accessToken;

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.artists.items; // retorna todos os artistas encontrados
}
