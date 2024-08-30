"use client";

import { useState, useEffect } from 'react';
import { searchSpotifyArtists } from '../app/lib/spotify';
import { getDeezerArtist } from '../app/lib/deezer';
import ArtistComparison from './components/ArtistComparison';
import Loader from './components/Loader';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [spotifyArtist, setSpotifyArtist] = useState<any>(null);
  const [deezerArtist, setDeezerArtist] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.trim().length > 2) {
      searchSpotifyArtists(searchTerm).then(setSuggestions).catch((err) => console.error(err));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = async (artist: any) => {
    setLoading(true);
    setError(null);
    try {
      const deezer = await getDeezerArtist(artist.name);
      setSpotifyArtist(artist);
      setDeezerArtist(deezer);
      setSuggestions([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center">
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
            className="absolute inset-y-0 right-0 p-3 flex items-center bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
              {suggestions.map((artist) => (
                <li
                  key={artist.id}
                  className="p-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSearch(artist)}
                >
                  {artist.name}
                </li>
              ))}
            </ul>
          )}
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
      <footer className="w-full text-center py-4 mt-8 border-t">
        <p className="text-gray-600">
          Made by{' '}
          <a
            href="https://github.com/pedrosantanna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Pedro Sant&#39;Anna
          </a>{' '}
          - 2024
        </p>
      </footer>
    </div>
  );
}
