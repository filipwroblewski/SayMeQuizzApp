import React, { useState, useRef } from "react";
import { saveData, loadData } from "./DataStorage";
import Popup from "./Popup";

const ImportForm = () => {
  const [jsonData, setJsonData] = useState("");
  const [popupInfo, setPopupInfo] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleLoadData = () => {
    try {
      if (jsonData === "{}" || jsonData === "[]" || !jsonData) {
        setPopupInfo({
          message: "Wprowadź dane JSON.",
          className: "danger",
        });
        return;
      }

      const parsedData = JSON.parse(jsonData);

      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        setPopupInfo({
          message: "Dane JSON powinny być niepustą tablicą.",
          className: "danger",
        });
        return;
      }

      parsedData.forEach((question) => {
        if (
          typeof question.kategoria !== "string" ||
          typeof question.pytanie !== "string" ||
          !Array.isArray(question.odpowiedzi) ||
          !Array.isArray(question.poprawneOdpowiedzi)
        ) {
          setPopupInfo({
            message: "Nieprawidłowa struktura danych JSON.",
            className: "danger",
          });
          return;
        }
      });

      const existingData = loadData("questions") || [];
      const updatedData = [...existingData, ...parsedData];

      saveData("questions", updatedData);
      setPopupInfo({
        message: "Poprawnie załadowano dane.",
        className: "success",
      });
    } catch (error) {
      setPopupInfo({
        message: `Błąd wczytywania danych JSON: ${error.message}. Spróbuj ponownie.`,
        className: "danger",
      });
    }
  };

  const handleFileInputChange = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setJsonData(fileContent);
      };
      reader.readAsText(file);
    } catch (error) {
      setPopupInfo({
        message: `Błąd: ${error.message}. Spróbuj ponownie.`,
        className: "error",
      });
    }
  };

  const handleFileLoad = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleLoadData();
  };

  const handlePopupClose = () => {
    setPopupInfo(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary ml-3" onClick={handleFileLoad}>
          Załaduj dane z pliku
        </button>
      </div>
      <input
        ref={fileInputRef}
        id="fileInput"
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <form className="mt-4" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Wklej dane w formacie JSON lub załaduj z pliku</label>
          <textarea
            className="form-control"
            rows="20"
            value={jsonData}
            onChange={handleInputChange}
            placeholder="Wklej dane w formacie JSON"
          ></textarea>
        </div>
        <div className="d-flex justify-content-center my-2">
          <button type="submit" className="btn btn-success">
            Załaduj dane
          </button>
        </div>
      </form>

      {popupInfo && (
        <Popup
          message={popupInfo.message}
          className={popupInfo.className}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default ImportForm;
