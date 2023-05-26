import React, { useEffect, useState } from "react";
import ImportForm from "./ImportForm";
import AddForm from "./AddForm";
import { loadData, saveData } from "./DataStorage";
import appSettings from "./appsettings";
import SettingsForm from "./SettingsForm";
import ShowMode from "./ShowMode";
import Popup from "./Popup";
import DataDisplay from "./DataDisplay";
import Sidebar from "./Sidebar";
import PlayersView from "./PlayersView";

const ConfigurationMode = () => {
  const [showImportForm, setShowImportForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [isDataDisplayed, setIsDataDisplayed] = useState(false);
  const [setSettingsUpdated] = useState(false);
  const [settings, setSettings] = useState(appSettings);
  const [isShowMode, setIsShowMode] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);
  const [showLoadPreviousGame, setShowLoadPreviousGame] = useState(false);
  const [continueGame, setContinueGame] = useState(false);

  useEffect(() => {
    const playersNumber = localStorage.getItem("playersNumber");
    const questionsNumber = localStorage.getItem("questionsNumber");
    const secondsLimit = localStorage.getItem("secondsLimit");

    if (!playersNumber) {
      localStorage.setItem("playersNumber", appSettings.playersNumber.default);
    }

    if (!questionsNumber) {
      localStorage.setItem(
        "questionsNumber",
        appSettings.questionsNumber.default
      );
    }

    if (!secondsLimit) {
      localStorage.setItem("secondsLimit", appSettings.secondsLimit.default);
    }

    const hasPreviousGame = Array.from(
      { length: appSettings.playersNumber.max },
      (_, i) => localStorage.getItem(`player${i}`)
    ).some((player) => player !== null);

    setShowLoadPreviousGame(hasPreviousGame);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showLoadPreviousGame &&
        !document
          .getElementById("loadPreviousGameOffcanvas")
          .contains(event.target)
      ) {
        setShowLoadPreviousGame(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showLoadPreviousGame]);

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

  const handleLoadPreviousGame = () => {
    setShowLoadPreviousGame(false);
    setContinueGame(true);
    setIsShowMode(false);
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
  };

  const handleShowMode = () => {
    const data = loadData("questions");
    if (data?.length > 0) {
      setIsShowMode(!isShowMode);
    } else {
      setPopupInfo({
        message:
          "Nie posiadasz jeszcze żadnych pytań. Dodaj pytania i spróbuj ponownie",
        className: "danger",
      });
      setIsShowMode(isShowMode);
    }
  };

  const handleCloseOffcanvas = () => {
    setShowLoadPreviousGame(false);
  };

  return (
    <div className="container-fluid">
      {isShowMode ? (
        <>
          <div className="row">
            <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
              <Sidebar
                showImportForm={showImportForm}
                showAddForm={showAddForm}
                isDataDisplayed={isDataDisplayed}
                handleImportClick={handleImportClick}
                handleAddClick={handleAddClick}
                handleDisplayData={handleDisplayData}
                handleExportData={handleExportData}
                handleClearLocalStorage={handleClearLocalStorage}
                handleShowMode={handleShowMode}
              />
            </div>

            <div className="col-md-9 col-lg-10">
              <div className="d-flex justify-content-center align-items-center">
                <SettingsForm
                  settings={settings}
                  onSettingsUpdate={handleSettingsUpdate}
                />
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center mt-3">
                {showImportForm && (
                  <ImportForm onImportData={handleImportData} />
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {showAddForm && <AddForm onAddQuestion={handleAddQuestion} />}
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4">
                {storedData && isDataDisplayed && (
                  <DataDisplay storedData={storedData} />
                )}
              </div>
              {popupInfo && (
                <div className="d-flex justify-content-center mt-4">
                  <Popup
                    message={popupInfo.message}
                    className={popupInfo.className}
                    onClose={handlePopupClose}
                  />
                </div>
              )}
            </div>
          </div>

          {showLoadPreviousGame && (
            <div
              className={`offcanvas offcanvas-start align-middle ${
                showLoadPreviousGame ? "show" : ""
              }`}
              tabIndex="-1"
              id="loadPreviousGameOffcanvas"
              aria-labelledby="loadPreviousGameOffcanvasLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="loadPreviousGameOffcanvasLabel"
                >
                  Poprzednia rozgrywka została przerwana
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={handleCloseOffcanvas}
                ></button>
              </div>
              <div className="offcanvas-body">
                <button
                  className="btn btn-primary px-2"
                  onClick={handleLoadPreviousGame}
                >
                  Wczytaj poprzedni stan gry
                </button>
              </div>
            </div>
          )}
        </>
      ) : continueGame ? (
        <PlayersView />
      ) : (
        <ShowMode />
      )}
    </div>
  );
};

export default ConfigurationMode;
