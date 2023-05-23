import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import QuestionView from "./QuestionView";
import SummaryView from "./SummaryView"; // Import SummaryView

const PlayersView = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [playerList, setPlayerList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showSummary, setShowSummary] = useState(false); // State for showing SummaryView

  useEffect(() => {
    const storedPlayerCount = localStorage.getItem("playersNumber");
    if (storedPlayerCount) {
      setPlayerCount(parseInt(storedPlayerCount));
    }
  }, []);

  useEffect(() => {
    const generatePlayerList = () => {
      const colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "muted",
      ];
      const list = [];

      for (let i = 0; i < playerCount; i++) {
        const player = JSON.parse(localStorage.getItem(`player${i}`));
        if (player) {
          player.color = colors[i % colors.length];
          list.push(player);
        }
      }

      setPlayerList(list);
    };

    generatePlayerList();
  }, [playerCount]);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  return (
    <div>
      {showSummary ? (
        <SummaryView /> // Show SummaryView
      ) : selectedPlayer ? (
        <QuestionView player={selectedPlayer} />
      ) : (
        <div className="row">
          {playerList.length > 0 ? (
            playerList.map((player) => (
              <div key={player.id} className="col-md-4 mb-3">
                <PlayerCard
                  player={player}
                  onClick={() => handlePlayerClick(player)}
                />
              </div>
            ))
          ) : (
            <p>Brak graczy.</p>
          )}
        </div>
      )}
      {!selectedPlayer &&
        !showSummary && ( // Render button only when no player is selected and not showing the summary
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handleShowSummary}>
              Podsumowanie rozgrywki
            </button>
          </div>
        )}
    </div>
  );
};

export default PlayersView;
