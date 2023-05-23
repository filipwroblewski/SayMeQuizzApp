import React, { useState } from "react";
import ImportForm from "./ImportForm";
import AddForm from "./AddForm";
import { loadData, saveData, clearLocalStorage } from "./DataStorage";
import appSettings from "./appsettings";
import SettingsForm from "./SettingsForm";
import ShowMode from "./ShowMode";
import Popup from "./Popup";

const ConfigurationMode = () => {
  const [showImportForm, setShowImportForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [isDataDisplayed, setIsDataDisplayed] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [settings, setSettings] = useState(appSettings);
  const [isConfigurationMode, setIsConfigurationMode] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);

  const handleImportClick = () => {
    setShowImportForm(!showImportForm);
    setShowAddForm(false);
    setIsDataDisplayed(false);
  };

  const handleAddClick = () => {
    setShowImportForm(false);
    setShowAddForm(!showAddForm);
    setIsDataDisplayed(false);
  };

  const handleDisplayData = () => {
    const data = loadData("questions");
    if (!data || data.length === 0) {
      setPopupInfo({
        message: "Brak dostępnych pytań",
        className: "danger",
      });
    } else {
      setStoredData(data);
      setIsDataDisplayed(!isDataDisplayed);
      setPopupInfo({
        message: `Aktualnie jest ${data.length} pytań.`,
        className: "primary",
      });
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("questions");
    setStoredData(null);
    setIsDataDisplayed(false);
    setPopupInfo({
      message: "Pytania zostały usunięte z pamięci lokalnej.",
      className: "danger",
    });
  };

  const handleAddQuestion = (newQuestion) => {
    console.log("Dodane pytanie:", newQuestion);
    setPopupInfo({
      message: "Pytanie zostało dodane",
      className: "primary",
    });
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
    setPopupInfo({
      message: "Dane zostały wyeksportowane do pliku questions.json",
      className: "primary",
    });
  };

  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  const handleImportData = (importedData) => {
    try {
      const parsedData = JSON.parse(importedData);
      if (Array.isArray(parsedData)) {
        saveData("questions", parsedData);
        setStoredData(parsedData);
        setIsDataDisplayed(false);
        setPopupInfo({
          message: "Poprawnie załadowano dane",
          className: "success",
        });
      }
    } catch (error) {
      console.error("Błąd ładowania danych:", error);
      setPopupInfo({
        message: "Błąd ładowania danych. Spróbuj ponownie",
        className: "danger",
      });
    }
  };

  const handleSettingsUpdate = (updatedSettings) => {
    setSettings(updatedSettings);
    setSettingsUpdated(true);
    settingsUpdated(true);
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
                <SettingsForm
                  settings={settings}
                  onSettingsUpdate={handleSettingsUpdate}
                />
              </div>

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
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Wyświetlone pytania:</h4>
                      <pre className="card-text">
                        {JSON.stringify(storedData, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
              {popupInfo && (
                <Popup
                  message={popupInfo.message}
                  className={popupInfo.className}
                  onClose={handlePopupClose}
                />
              )}
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
