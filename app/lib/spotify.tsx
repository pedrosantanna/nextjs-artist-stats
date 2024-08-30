// lib/spotify.ts
export async function getSpotifyArtist(artistName: string) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    return data.artists.items[0]; // retorna o primeiro resultado
  }