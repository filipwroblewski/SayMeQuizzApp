// ImportForm.js

import React, { useState } from "react";
import { saveData, loadData } from "./DataStorage";

const ImportForm = () => {
  const [jsonData, setJsonData] = useState("");

  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleLoadData = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      console.log("Załadowane dane:", parsedData);

      const existingData = loadData("questions") || []; // Retrieve existing "questions" data
      const updatedData = [...existingData, ...parsedData]; // Merge existing data with parsed data

      saveData("questions", updatedData); // Save the updated data
    } catch (error) {
      console.error("Błąd wczytywania danych JSON:", error);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setJsonData(fileContent);
    };
    reader.readAsText(file);
  };

  const handleFileLoad = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleLoadData();
  };

  return (
    <div>
      <div className="d-flex ml-auto">
        <button className="btn btn-secondary ml-3" onClick={handleFileLoad}>
          Załaduj dane z pliku
        </button>
      </div>
      <input
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
            rows="4"
            value={jsonData}
            onChange={handleInputChange}
            placeholder="Wklej dane w formacie JSON"
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Załaduj dane
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImportForm;
