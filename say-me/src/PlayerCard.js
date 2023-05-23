// PlayerCard.js

import React from "react";

const PlayerCard = ({ player, onClick }) => {
  return (
    <div className="card" style={{ maxWidth: "18rem" }}>
      <div className="card-body" onClick={onClick}>
        <h5 className={`card-title text-${player.color}`}>{player.name}</h5>
        <p className="card-text">
          Punkty: {player.points}
          <br />
          Łączna liczba pytań: {player.totalQuestions}
        </p>
      </div>
    </div>
  );
};

export default PlayerCard;
