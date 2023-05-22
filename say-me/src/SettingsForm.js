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
    setPlayersNumber(settings.playersNumber.default);
    setQuestionsNumber(settings.questionsNumber.default);
    setSecondsLimit(settings.secondsLimit.default);
  }, [settings]);

  const handlePlayersNumberChange = (event) => {
    setPlayersNumber(event.target.value);
  };

  const handleQuestionsNumberChange = (event) => {
    setQuestionsNumber(event.target.value);
  };

  const handleSecondsLimitChange = (event) => {
    setSecondsLimit(event.target.value);
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
    onSettingsUpdate(updatedSettings); // Wywołanie funkcji przekazanej przez propsy do zaktualizowania ustawień w stanie nadrzędnym
    onSaveSettings(updatedSettings); // Wywołanie funkcji przekazanej przez propsy do zapisu ustawień
    setPopupInfo({ message: "Ustawienia zapisane.", className: "primary" });
  };

  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  return (
    <form className="mt-4" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>Liczba graczy:</label>
        <input
          type="range"
          className="form-control-range"
          min={appSettings.playersNumber.min}
          max={appSettings.playersNumber.max}
          value={playersNumber}
          onChange={handlePlayersNumberChange}
        />
        <span>{playersNumber}</span>
      </div>
      <div className="form-group">
        <label>Liczba pytań:</label>
        <input
          type="range"
          className="form-control-range"
          min={appSettings.questionsNumber.min}
          max={appSettings.questionsNumber.max}
          value={questionsNumber}
          onChange={handleQuestionsNumberChange}
        />
        <span>{questionsNumber}</span>
      </div>
      <div className="form-group">
        <label>Limit czasu (w sekundach):</label>
        <input
          type="number"
          className="form-control"
          min={appSettings.secondsLimit.min}
          value={secondsLimit}
          onChange={handleSecondsLimitChange}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Zapisz ustawienia
        </button>
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
