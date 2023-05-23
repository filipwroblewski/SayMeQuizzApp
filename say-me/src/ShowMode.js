// ShowMode.js

import React, { useState } from "react";
import WelcomeView from "./WelcomeView";
import PlayersView from "./PlayersView";

const ShowMode = () => {
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    const playersCount = parseInt(localStorage.getItem("playersNumber"));

    for (let i = 0; i < playersCount; i++) {
      const player = {
        id: i,
        name: `Gracz ${i + 1}`,
        points: 0,
        totalQuestions: 0,
      };
      localStorage.setItem(`player${i}`, JSON.stringify(player));
    }

    setStartGame(true);
  };

  return (
    <div>
      {startGame ? (
        <PlayersView />
      ) : (
        <div className="card text-center">
          <div className="card-body">
            <WelcomeView />
            <button className="btn btn-success mt-4" onClick={handleStartGame}>
              Rozpocznij grę
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMode;
