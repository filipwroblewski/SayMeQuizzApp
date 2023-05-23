import React, { useEffect, useState } from "react";
import Popup from "./Popup";

const SummaryView = () => {
  const [playerData, setPlayerData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getPlayerData = () => {
      const players = [];
      const playerCount = 8;
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
    window.location.reload(true); // Performs a hard refresh
  };

  return (
    <div>
      {showPopup && (
        <Popup
          message="Odśwież stronę, aby rozpocząć kolejną rozgrywkę."
          className="info"
          onClose={handleClosePopup}
        />
      )}
      <h2>Podsumowanie rozgrywki</h2>
      <p>Odśwież stronę, aby rozpocząć kolejną rozgrywkę.</p>
      <button className="btn btn-primary" onClick={handleRestart}>
        Zagraj ponownie
      </button>

      <div className="container">
        <div className="row">
          <div className="col-md-4 align-self-end">
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
          <div className="col-md-4">
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
          <div className="col-md-4 align-self-end">
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
                  <div key={player.id} className="card text-center">
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
