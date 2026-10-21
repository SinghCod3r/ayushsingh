import React from 'react';

export const CinemaAmbient: React.FC = () => {
  return (
    <div className="cinema-ambient-wrap" aria-hidden="true">
      <video
        className="cinema-ambient-video"
        src="./assets/cinema.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="cinema-ambient-scrim" />
    </div>
  );
};

