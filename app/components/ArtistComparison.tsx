"use client";

import { useState } from 'react';
import { getSpotifyArtist } from '../lib/spotify';
import { getDeezerArtist } from '../lib/deezer';
import ArtistComparison from './components/ArtistComparison';
import Loader from './components/Loader';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState<any>(null);
  const [deezerArtist, setDeezerArtist] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a valid artist name');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const spotify = await getSpotifyArtist(searchTerm);
      const deezer = await getDeezerArtist(searchTerm);
      setSpotifyArtist(spotify);
      setDeezerArtist(deezer);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Artist Comparator</h1>
      <div className="relative w-full max-w-2xl mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pr-12 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for an artist"
        />
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 p-3 flex items-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        spotifyArtist && deezerArtist && (
          <div className="w-full max-w-4xl mt-8">
            <ArtistComparison spotifyArtist={spotifyArtist} deezerArtist={deezerArtist} />
          </div>
        )
      )}
    </div>
  );
}
