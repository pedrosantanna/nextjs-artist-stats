"use client";

import { useState } from 'react';
import { getSpotifyArtist } from '../app/lib/spotify';
import { getDeezerArtist } from '../app/lib/deezer';
import ArtistComparison from './components/ArtistComparison';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState<any>(null);
  const [deezerArtist, setDeezerArtist] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    try {
      const spotify = await getSpotifyArtist(searchTerm);
      const deezer = await getDeezerArtist(searchTerm);
      setSpotifyArtist(spotify);
      setDeezerArtist(deezer);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Artist Comparator</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Search for an artist"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {spotifyArtist && deezerArtist && (
        <ArtistComparison
          spotifyArtist={spotifyArtist}
          deezerArtist={deezerArtist}
        />
      )}
    </div>
  );
}
