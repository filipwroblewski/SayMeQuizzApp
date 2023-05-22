// SettingsForm.js

import React, { useState, useEffect } from "react";
import appSettings from "./appsettings";
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
    setPlayersNumber(
      localStorage.getItem("playersNumber") || settings.playersNumber.default
    );
    setQuestionsNumber(
      localStorage.getItem("questionsNumber") ||
        settings.questionsNumber.default
    );
    setSecondsLimit(
      localStorage.getItem("secondsLimit") || settings.secondsLimit.default
    );
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedSettings = {
      playersNumber: {
        min: appSettings.playersNumber.min,
        max: appSettings.playersNumber.max,
        default: parseInt(playersNumber),
      },
      questionsNumber: {
        min: appSettings.questionsNumber.min,
        max: appSettings.questionsNumber.max,
        default: parseInt(questionsNumber),
      },
      secondsLimit: {
        min: appSettings.secondsLimit.min,
        default: parseInt(secondsLimit),
      },
    };
    onSettingsUpdate(updatedSettings);
    onSaveSettings(updatedSettings);
    setPopupInfo({ message: "Ustawienia zapisane.", className: "primary" });
  };

  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  return (
    <form className="mt-4" onSubmit={handleFormSubmit}>
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
              min={appSettings.playersNumber.min}
              max={appSettings.playersNumber.max}
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
              min={appSettings.questionsNumber.min}
              max={appSettings.questionsNumber.max}
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
              min={appSettings.secondsLimit.min}
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
