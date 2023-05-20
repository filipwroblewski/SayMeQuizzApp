// ConfigurationMode.js

import React, { useState } from "react";
import ImportForm from "./ImportForm";
import AddForm from "./AddForm";
import { loadData, saveData, clearLocalStorage } from "./DataStorage";

const ConfigurationMode = () => {
  const [showImportForm, setShowImportForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [isDataDisplayed, setIsDataDisplayed] = useState(false);
  const [message, setMessage] = useState("");

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
    // Add your logic to handle adding a question
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

  return (
    <div className="container">
      <h2 className="mt-4">Tryb konfiguracji</h2>
      <div className="d-flex mt-3">
        <button className="btn btn-primary" onClick={handleImportClick}>
          {showImportForm ? "Schowaj formularz importu" : "Import zbiorczy"}
        </button>
        <button className="btn btn-primary ml-3" onClick={handleAddClick}>
          {showAddForm
            ? "Schowaj formularz dodawania pytania"
            : "Dodaj pytanie i odpowiedź"}
        </button>
        <button className="btn btn-secondary ml-3" onClick={handleDisplayData}>
          {isDataDisplayed ? "Schowaj pytania" : "Wyświetl pytania"}
        </button>
        <button className="btn btn-success ml-3" onClick={handleExportData}>
          Eksportuj
        </button>
        <button
          className="btn btn-danger ml-3"
          onClick={handleClearLocalStorage}
        >
          Resetuj
        </button>
      </div>
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
  );
};

export default ConfigurationMode;
