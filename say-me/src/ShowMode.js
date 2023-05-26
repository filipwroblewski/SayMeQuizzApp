import React, { useState } from "react";
import WelcomeView from "./WelcomeView";
import PlayersView from "./PlayersView";
import appSettings from "./appsettings";
import { loadData, saveData } from "./DataStorage";

const ShowMode = () => {
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    const playersCount = parseInt(loadData("playersNumber"));
    const maxPlayers = appSettings.playersNumber.max;

    for (let i = playersCount; i < maxPlayers; i++) {
      localStorage.removeItem(`player${i}`);
    }

    for (let i = 0; i < playersCount; i++) {
      const player = {
        id: i,
        name: `Gracz ${i + 1}`,
        points: 0,
        totalQuestions: 0,
      };
      localStorage.setItem(`player${i}`, JSON.stringify(player));
    }

    const questions = loadData("questions");
    const questionsNumber = parseInt(loadData("questionsNumber"));

    if (questions && questions.length > questionsNumber) {
      const shuffledQuestions = shuffleArray(questions).slice(
        0,
        questionsNumber
      );
      saveData("questions", shuffledQuestions);
    }

    setStartGame(true);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
