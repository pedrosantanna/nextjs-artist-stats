import React from 'react';

type ArtistProps = {
  spotifyArtist: any;
  deezerArtist: any;
};

const ArtistComparison: React.FC<ArtistProps> = ({ spotifyArtist, deezerArtist }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{spotifyArtist.name} (Spotify)</h2>
        <img
          src={spotifyArtist.images[0]?.url}
          alt={spotifyArtist.name}
          className="w-full h-auto mb-4 rounded-lg object-cover"
        />
        <p className="text-gray-700 mb-2">Followers: <span className="font-bold">{spotifyArtist.followers.total.toLocaleString()}</span></p>
        <p className="text-gray-700">Popularity: <span className="font-bold">{spotifyArtist.popularity}</span></p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{deezerArtist.name} (Deezer)</h2>
        <img
          src={deezerArtist.picture_medium}
          alt={deezerArtist.name}
          className="w-full h-auto mb-4 rounded-lg object-cover"
        />
        <p className="text-gray-700 mb-2">Followers: <span className="font-bold">{deezerArtist.nb_fan.toLocaleString()}</span></p>
      </div>
    </div>
  );
};

export default ArtistComparison;
