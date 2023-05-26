import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import appSettings from "./appsettings";
import "animate.css/animate.min.css";
import "animate.css";

const SummaryView = () => {
  const [playerData, setPlayerData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getPlayerData = () => {
      const players = [];
      const playerCount = appSettings.playersNumber.max;
      Array(playerCount)
        .fill()
        .forEach((_, i) => {
          const player = JSON.parse(localStorage.getItem(`player${i}`));
          if (player) {
            players.push(player);
          }
        });
      players.sort((a, b) => b.points - a.points);
      setPlayerData(players);
    };

    getPlayerData();
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRestart = () => {
    // Usunięcie wszystkich graczy z localStorage
    const playerCount = appSettings.playersNumber.max;
    Array(playerCount)
      .fill()
      .forEach((_, i) => {
        localStorage.removeItem(`player${i}`);
      });

    window.location.reload(true);
  };

  return (
    <div>
      {showPopup && (
        <Popup
          message="Brawo, udało wam się ukończyć całą rozgrywkę."
          className="success"
          onClose={handleClosePopup}
        />
      )}
      <h2>Podsumowanie rozgrywki</h2>
      <p>
        Brawo, udało wam się ukończyć całą rozgrywkę. Teraz możecie rozpocząć
        kolejną.
      </p>
      <button className="btn btn-primary" onClick={handleRestart}>
        Zagraj ponownie
      </button>

      <div className="container">
        <div className="row">
          <div className="col-md-4 align-self-end animate__animated animate__bounce">
            {playerData.length > 1 && (
              <div
                className="card text-center"
                style={{ height: "300px", marginBottom: "auto" }}
              >
                <div className="card-header">2. miejsce</div>
                <div className="card-body">
                  <h5 className="card-title">{playerData[1].name}</h5>
                  <p className="card-text">Punkty: {playerData[1].points}</p>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4 animate__animated animate__bounce">
            {playerData.length > 0 && (
              <div
                className="card text-center align-self-end"
                style={{ height: "400px" }}
              >
                <div className="card-header">1. miejsce</div>
                <div className="card-body">
                  <h5 className="card-title">{playerData[0].name}</h5>
                  <p className="card-text">Punkty: {playerData[0].points}</p>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4 align-self-end animate__animated animate__bounce">
            {playerData.length > 2 && (
              <div className="card text-center align-self-end">
                <div className="card-header">3. miejsce</div>
                <div className="card-body">
                  <h5 className="card-title">{playerData[2].name}</h5>
                  <p className="card-text">Punkty: {playerData[2].points}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 offset-md-3">
            <div className="card-deck">
              {playerData.length > 3 &&
                playerData.slice(3).map((player, index) => (
                  <div
                    key={player.id}
                    className="card text-center animate__animated animate__fadeIn"
                    style={{ animationDelay: `${(index + 1) * 1}s` }}
                  >
                    <div className="card-header">{index + 4}. miejsce</div>
                    <div className="card-body">
                      <h5 className="card-title">{player.name}</h5>
                      <p className="card-text">Punkty: {player.points}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
