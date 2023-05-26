import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import QuestionView from "./QuestionView";
import SummaryView from "./SummaryView";

const PlayersView = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [playerList, setPlayerList] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    const storedPlayerCount = localStorage.getItem("playersNumber");
    if (storedPlayerCount) {
      setPlayerCount(parseInt(storedPlayerCount));
    }
  }, []);

  useEffect(() => {
    const storedQuestionCount = localStorage.getItem("questions");
    if (storedQuestionCount) {
      const parsedQuestionCount = JSON.parse(storedQuestionCount).length;
      setQuestionCount(parsedQuestionCount);

      if (parsedQuestionCount === 0) {
        setShowSummary(true);
      }
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
        <SummaryView />
      ) : selectedPlayer ? (
        <QuestionView player={selectedPlayer} />
      ) : (
        <div className="row">
          {playerList.length > 0 && questionCount > 0
            ? playerList.map((player) => (
                <div key={player.id} className="col-md-4 mb-3">
                  <PlayerCard
                    player={player}
                    onClick={() => handlePlayerClick(player)}
                  />
                </div>
              ))
            : null}
        </div>
      )}
      {!selectedPlayer && !showSummary && questionCount > 0 && (
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
