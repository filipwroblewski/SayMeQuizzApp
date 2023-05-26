import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const SettingsForm = ({ settings, onSettingsUpdate, onSaveSettings }) => {
  const [playersNumber, setPlayersNumber] = useState(
    settings.playersNumber.default
  );
  const [questionsNumber, setQuestionsNumber] = useState(
    settings.questionsNumber.default
  );
  const [secondsLimit, setSecondsLimit] = useState(
    settings.secondsLimit.default
  );
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const storedPlayersNumber =
      localStorage.getItem("playersNumber") || settings.playersNumber.default;
    const storedQuestionsNumber =
      localStorage.getItem("questionsNumber") ||
      settings.questionsNumber.default;
    const storedSecondsLimit =
      localStorage.getItem("secondsLimit") || settings.secondsLimit.default;

    setPlayersNumber(storedPlayersNumber);
    setQuestionsNumber(storedQuestionsNumber);
    setSecondsLimit(storedSecondsLimit);
  }, [settings]);

  const handlePlayersNumberChange = (event) => {
    const value = event.target.value;
    setPlayersNumber(value);
    localStorage.setItem("playersNumber", value);
  };

  const handleQuestionsNumberChange = (event) => {
    const value = event.target.value;
    setQuestionsNumber(value);
    localStorage.setItem("questionsNumber", value);
  };

  const handleSecondsLimitChange = (event) => {
    const value = event.target.value;
    setSecondsLimit(value);
    localStorage.setItem("secondsLimit", value);
  };

  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  return (
    <form className="mt-4">
      <h4 className="mb-4">Ustawienia:</h4>
      <div className="list-group">
        <div className="list-group-item">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Liczba graczy</span>
            </div>
            <input
              type="range"
              className="form-control"
              min={settings.playersNumber.min}
              max={settings.playersNumber.max}
              value={playersNumber}
              onChange={handlePlayersNumberChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">{playersNumber}</span>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Liczba pytań</span>
            </div>
            <input
              type="range"
              className="form-control"
              min={settings.questionsNumber.min}
              max={settings.questionsNumber.max}
              value={questionsNumber}
              onChange={handleQuestionsNumberChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">{questionsNumber}</span>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Limit czasu (w sekundach)
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              min={settings.secondsLimit.min}
              value={secondsLimit}
              onChange={handleSecondsLimitChange}
            />
          </div>
        </div>
      </div>
      {popupInfo && (
        <Popup
          message={popupInfo.message}
          className={popupInfo.className}
          onClose={handlePopupClose}
        />
      )}
    </form>
  );
};

export default SettingsForm;
