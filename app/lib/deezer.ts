export async function getDeezerArtist(artistName: string) {
  const response = await fetch(`/api/deezer?q=${encodeURIComponent(artistName)}`);
  if (!response.ok) {
    throw new Error(`Deezer API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.data && data.data.length > 0) {
    return data.data[0];
  } else {
    throw new Error('No artists found on Deezer');
  }
}
