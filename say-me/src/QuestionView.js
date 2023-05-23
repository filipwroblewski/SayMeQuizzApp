import React, { useEffect, useState } from "react";
import PlayersView from "./PlayersView";

const QuestionView = ({ player }) => {
  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const secondsLimit = parseInt(localStorage.getItem("secondsLimit"));
  const [remainingTime, setRemainingTime] = useState(secondsLimit);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [showAddPointsButton, setShowAddPointsButton] = useState(false);
  const [skipWaiting, setSkipWaiting] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      const questions = JSON.parse(storedQuestions);
      setRemainingQuestions(questions);
    }
  }, []);

  useEffect(() => {
    if (remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const selectedQuestion = remainingQuestions[randomIndex];
      setCurrentQuestion(selectedQuestion);
      setRemainingQuestions((prevQuestions) =>
        prevQuestions.filter((_, index) => index !== randomIndex)
      );
    }
  }, [remainingQuestions]);

  useEffect(() => {
    let intervalId = null;

    if (remainingTime > 0 && !skipWaiting) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setShowAnswers(true);
      setShowAddPointsButton(true);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [remainingTime, skipWaiting]);

  const handleShowPlayers = () => {
    if (player) {
      const storedPlayer = JSON.parse(
        localStorage.getItem(`player${player.id}`)
      );
      if (storedPlayer) {
        const updatedPlayer = {
          ...storedPlayer,
          totalQuestions: storedPlayer.totalQuestions + 1,
        };
        localStorage.setItem(
          `player${player.id}`,
          JSON.stringify(updatedPlayer)
        );
      }
    }
    setShowPlayers(true);
  };

  const handleAddPoints = () => {
    if (player) {
      const storedPlayer = JSON.parse(
        localStorage.getItem(`player${player.id}`)
      );
      if (storedPlayer) {
        const updatedPlayer = {
          ...storedPlayer,
          points: storedPlayer.points + 10,
        };
        localStorage.setItem(
          `player${player.id}`,
          JSON.stringify(updatedPlayer)
        );
      }
    }
    handleShowPlayers();
  };

  const handleSkipWaiting = () => {
    setRemainingTime(0);
    setSkipWaiting(true);
  };

  if (showPlayers) {
    return <PlayersView />;
  }

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-header">
        <h5 className="mb-0">
          <span className="text-secondary">Odpowiedzi udziela: </span>
          {player?.name}
        </h5>
      </div>
      {currentQuestion && (
        <div className="card-body">
          <h5 className="card-title">Kategoria: {currentQuestion.kategoria}</h5>
          <p className="card-text">Pytanie: {currentQuestion.pytanie}</p>
          <ul className="list-group list-group-flush">
            {currentQuestion.odpowiedzi.map((odpowiedz, index) => (
              <li className="list-group-item" key={index}>
                {odpowiedz}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showAnswers && (
        <div className="card-body">
          <p className="card-text">Poprawne odpowiedzi:</p>
          <ul className="list-group list-group-flush">
            {currentQuestion.poprawneOdpowiedzi.map(
              (poprawnaOdpowiedz, index) => (
                <li className="list-group-item text-success" key={index}>
                  {poprawnaOdpowiedz}
                </li>
              )
            )}
          </ul>
          <div className="card-footer d-flex justify-content-between">
            <button className="btn btn-danger" onClick={handleShowPlayers}>
              Nie dodawaj punktów
            </button>
            {showAddPointsButton && (
              <button className="btn btn-success" onClick={handleAddPoints}>
                Dodaj punkty
              </button>
            )}
          </div>
        </div>
      )}
      {!showAnswers && (
        <div className="card-body">
          <p className="card-text">Limit czasu: {remainingTime} sek.</p>
          <button className="btn btn-warning" onClick={handleSkipWaiting}>
            Pomiń czas oczekiwania
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionView;
