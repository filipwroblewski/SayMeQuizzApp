import React, { useState } from "react";
import ImportForm from "./ImportForm";
import AddForm from "./AddForm";
import { loadData, saveData, clearLocalStorage } from "./DataStorage";
import appSettings from "./appsettings";
import SettingsForm from "./SettingsForm";
import ShowMode from "./ShowMode";

const ConfigurationMode = () => {
  const [showImportForm, setShowImportForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [isDataDisplayed, setIsDataDisplayed] = useState(false);
  const [message, setMessage] = useState("");
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [settings, setSettings] = useState(appSettings);
  const [showMode, setShowMode] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isConfigurationMode, setIsConfigurationMode] = useState(true);

  const handleEditSettings = () => {
    setShowSettingsForm(!showSettingsForm);
  };

  const handleImportClick = () => {
    setShowImportForm(!showImportForm);
    setShowAddForm(false);
    setIsDataDisplayed(false);
    setMessage("");
  };

  const handleAddClick = () => {
    setShowImportForm(false);
    setShowAddForm(!showAddForm);
    setIsDataDisplayed(false);
    setMessage("");
  };

  const handleShowModeClick = () => {
    setShowMode(true);
    setIsPresentationMode(true);
  };

  const handleDisplayData = () => {
    const data = loadData("questions");
    setStoredData(data);
    setIsDataDisplayed(!isDataDisplayed);
  };

  const handleClearLocalStorage = () => {
    clearLocalStorage();
    setStoredData(null);
    setIsDataDisplayed(false);
    setMessage("Pamięć lokalna została zresetowana");
  };

  const handleAddQuestion = (newQuestion) => {
    console.log("Dodane pytanie:", newQuestion);
    setMessage("Pytanie zostało dodane");
  };

  const handleExportData = () => {
    const data = loadData("questions");
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "questions.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (importedData) => {
    try {
      const parsedData = JSON.parse(importedData);
      if (Array.isArray(parsedData)) {
        saveData("questions", parsedData);
        setStoredData(parsedData);
        setIsDataDisplayed(false);
        setMessage("Poprawnie załadowano dane");
      }
    } catch (error) {
      console.error("Błąd ładowania danych:", error);
      setMessage("Błąd ładowania danych. Spróbuj ponownie");
    }
  };

  const handleSettingsUpdate = (updatedSettings) => {
    setSettings(updatedSettings);
    setSettingsUpdated(true);
  };

  const handleSaveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    setSettingsUpdated(false);
    setMessage("Ustawienia zostały zapisane");
  };

  const handleToggleConfigurationMode = () => {
    setIsConfigurationMode(!isConfigurationMode);
  };

  return (
    <div className="container-fluid">
      {isConfigurationMode ? (
        <>
          <div className="row">
            <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
              <div
                className="d-flex flex-column flex-shrink-0 p-3 bg-light"
                style={{ width: "280px" }}
              >
                <a
                  href="/"
                  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
                >
                  <span className="fs-4">Tryb konfiguracji</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <button
                      className="btn btn-primary"
                      onClick={handleEditSettings}
                    >
                      {showSettingsForm
                        ? "Schowaj formularz"
                        : "Edytuj ustawienia"}
                    </button>
                  </li>
                  <hr />
                  <li>
                    <button
                      className="btn btn-primary"
                      onClick={handleImportClick}
                    >
                      {showImportForm
                        ? "Schowaj formularz importu"
                        : "Import zbiorczy"}
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-primary ml-3"
                      onClick={handleAddClick}
                    >
                      {showAddForm
                        ? "Schowaj formularz dodawania pytania"
                        : "Dodaj pytanie i odpowiedź"}
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-secondary ml-3"
                      onClick={handleDisplayData}
                    >
                      {isDataDisplayed ? "Schowaj pytania" : "Wyświetl pytania"}
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-success ml-3"
                      onClick={handleExportData}
                    >
                      Eksportuj
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-danger ml-3"
                      onClick={handleClearLocalStorage}
                    >
                      Resetuj
                    </button>
                  </li>
                </ul>
                <hr />
                <strong>
                  <button
                    className="btn btn-primary ml-3"
                    onClick={handleToggleConfigurationMode}
                  >
                    Uruchom tryb prezentacji
                  </button>
                </strong>
              </div>
            </div>
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
              <div>
                <h4>Ustawienia:</h4>
                <p>
                  Liczba graczy: {settings.playersNumber.min} -{" "}
                  {settings.playersNumber.max} (ustawione:{" "}
                  {settings.playersNumber.default})
                </p>
                <p>
                  Liczba pytań: {settings.questionsNumber.min} -{" "}
                  {settings.questionsNumber.max} (ustawione:{" "}
                  {settings.questionsNumber.default})
                </p>
                <p>
                  Limit czasu (w sekundach): {settings.secondsLimit.min}{" "}
                  (ustawione: {settings.secondsLimit.default})
                </p>
              </div>

              {showSettingsForm && (
                <SettingsForm
                  settings={settings}
                  onSettingsUpdate={handleSettingsUpdate}
                  onSaveSettings={handleSaveSettings}
                />
              )}
              <div className="d-flex mt-3"></div>
              {showImportForm && (
                <div>
                  <ImportForm onImportData={handleImportData} />
                </div>
              )}
              {showAddForm && (
                <div>
                  <AddForm onAddQuestion={handleAddQuestion} />
                </div>
              )}
              {storedData && isDataDisplayed && (
                <div className="mt-4">
                  <h4>Wyświetlone pytania:</h4>
                  <pre>{JSON.stringify(storedData, null, 2)}</pre>
                </div>
              )}
              {message && <div className="mt-4">{message}</div>}
            </div>
          </div>
        </>
      ) : (
        <ShowMode />
      )}
    </div>
  );
};

export default ConfigurationMode;
