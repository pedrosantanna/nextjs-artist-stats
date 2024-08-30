import { useState } from 'react';
import { getSpotifyArtist } from '../app/lib/spotify';
import ArtistComparison from '../app/components/ArtistComparison';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState(null);
  //const [deezerArtist, setDeezerArtist] = useState(null);

  const handleSearch = async () => {
    const spotify = await getSpotifyArtist(searchTerm);
    //const deezer = await getDeezerArtist(searchTerm);
    setSpotifyArtist(spotify);
    //setDeezerArtist(deezer);
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
      {spotifyArtist && (
        <ArtistComparison
          spotifyArtist={spotifyArtist}
          //deezerArtist={deezerArtist}
        />
      )}
    </div>
  );
};

export default Home;
