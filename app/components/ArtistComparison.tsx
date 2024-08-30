import React from 'react';

type ArtistProps = {
  spotifyArtist: any;
  deezerArtist: any;
};

const ArtistComparison: React.FC<ArtistProps> = ({ spotifyArtist, deezerArtist }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-xl font-bold">{spotifyArtist.name} (Spotify)</h2>
        <img src={spotifyArtist.images[0]?.url} alt={spotifyArtist.name} />
        <p>Followers: {spotifyArtist.followers.total}</p>
        <p>Popularity: {spotifyArtist.popularity}</p>
      </div>
      <div>
        <h2 className="text-xl font-bold">{deezerArtist.name} (Deezer)</h2>
        <img src={deezerArtist.picture_medium} alt={deezerArtist.name} />
        <p>Followers: {deezerArtist.nb_fan}</p>
      </div>
    </div>
  );
};

export default ArtistComparison;
