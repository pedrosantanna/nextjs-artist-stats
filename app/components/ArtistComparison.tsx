"use client"; // Adicione isso no topo do arquivo

import React from 'react';

type ArtistProps = {
  spotifyArtist: any;
};

const ArtistComparison: React.FC<ArtistProps> = ({ spotifyArtist }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold">{spotifyArtist.name} (Spotify)</h2>
        <img src={spotifyArtist.images[0]?.url} alt={spotifyArtist.name} />
        <p>Followers: {spotifyArtist.followers.total}</p>
        <p>Popularity: {spotifyArtist.popularity}</p>
      </div>
      <div>
        deezer aqui
      </div>
    </div>
  );
};

export default ArtistComparison;
