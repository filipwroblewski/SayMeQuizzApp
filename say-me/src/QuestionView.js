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
    if (currentQuestion) {
      const storedQuestions = localStorage.getItem("questions");
      if (storedQuestions) {
        const questions = JSON.parse(storedQuestions);
        const updatedQuestions = questions.filter(
          (question) => question.pytanie !== currentQuestion.pytanie
        );
        localStorage.setItem("questions", JSON.stringify(updatedQuestions));
      }
    }
    setCurrentQuestion(null);
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
    <div className="card text-center" style={{ width: "100%" }}>
      <div className="card-header">
        <h5 className="mb-0">
          <span className="text-secondary">Odpowiedzi udziela: </span>
          {player?.name}
        </h5>
      </div>
      {currentQuestion && (
        <div className="card-body">
          <h5 className="card-title">
            Kategoria:{" "}
            {currentQuestion.kategoria ? currentQuestion.kategoria : "Brak"}
          </h5>

          <p className="card-text">
            Pytanie:{" "}
            {currentQuestion.pytanie
              ? currentQuestion.pytanie
              : "Ups. Nie ma tu pytania. Powodzenia z odpowiedzią ;P"}
          </p>

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
          <div className="card-text">
            {currentQuestion.poprawneOdpowiedzi.length > 1 ? (
              <p>Poprawne odpowiedzi:</p>
            ) : (
              <p>Poprawna odpowiedź:</p>
            )}
          </div>

          <ul className="list-group list-group-flush">
            {currentQuestion.poprawneOdpowiedzi[0] !== "" ? (
              currentQuestion.poprawneOdpowiedzi.map(
                (poprawnaOdpowiedz, index) => (
                  <li className="list-group-item text-success" key={index}>
                    {poprawnaOdpowiedz}
                  </li>
                )
              )
            ) : (
              <li className="list-group-item text-secondary">
                Nie ma odpowiedzi na to pytanie.
              </li>
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
        <div className="card-body text-center">
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
