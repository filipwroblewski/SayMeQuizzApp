import React from "react";

const Sidebar = ({
  showImportForm,
  showAddForm,
  isDataDisplayed,
  handleImportClick,
  handleAddClick,
  handleDisplayData,
  handleExportData,
  handleClearLocalStorage,
  handleShowMode,
}) => {
  return (
    <div>
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
              className="btn btn-primary btn-block mb-3"
              onClick={handleImportClick}
            >
              {showImportForm ? "Schowaj formularz importu" : "Import zbiorczy"}
            </button>
          </li>
          <li>
            <button
              className="btn btn-primary btn-block mb-3"
              onClick={handleAddClick}
            >
              {showAddForm
                ? "Schowaj formularz dodawania"
                : "Dodaj pytanie i odpowiedź"}
            </button>
          </li>
          <li>
            <button
              className="btn btn-secondary btn-block mb-3"
              onClick={handleDisplayData}
            >
              {isDataDisplayed ? "Schowaj pytania" : "Wyświetl pytania"}
            </button>
          </li>
          <li>
            <button
              className="btn btn-success btn-block mb-3"
              onClick={handleExportData}
            >
              Eksportuj
            </button>
          </li>
          <li>
            <button
              className="btn btn-danger btn-block mb-3"
              onClick={handleClearLocalStorage}
            >
              Resetuj
            </button>
          </li>
        </ul>
        <hr />
        <strong>
          <button
            className="btn btn-primary btn-block"
            onClick={handleShowMode}
          >
            Uruchom tryb prezentacji
          </button>
        </strong>
      </div>
    </div>
  );
};

export default Sidebar;
