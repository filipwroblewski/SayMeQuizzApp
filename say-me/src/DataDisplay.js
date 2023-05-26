import React, { useState } from "react";
import Popup from "./Popup";

const DataDisplay = () => {
  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("questions"))
  );
  const [deletedQuestion, setDeletedQuestion] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteQuestion = (index) => {
    const updatedData = [...storedData];
    const deletedQuestion = updatedData.splice(index, 1)[0];
    localStorage.setItem("questions", JSON.stringify(updatedData));
    setStoredData(updatedData);
    setDeletedQuestion(deletedQuestion.pytanie);
    setShowPopup(true);
  };

  return (
    <div className="row">
      {storedData &&
        storedData.map((question, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-3">
              <div className="card-body">
                {showPopup && (
                  <Popup
                    message={`Pytanie "${deletedQuestion}" zostało usunięte.`}
                    className="danger"
                    onClose={() => setShowPopup(false)}
                  />
                )}
                <button
                  className="btn btn-outline-danger btn-sm btn-delete"
                  onClick={() => handleDeleteQuestion(index, question)}
                  style={{ position: "absolute", top: "0", right: "0" }}
                >
                  Usuń
                </button>
                <h5
                  className="card-title"
                  style={{
                    maxHeight: "100px",
                    overflow: "hidden",
                    marginBottom: "10px",
                  }}
                >
                  {question.pytanie}
                </h5>

                <h6 className="card-subtitle my-2 text-muted">
                  Kategoria: {question.kategoria}
                </h6>
                <h6 className="card-subtitle my-2 text-muted">Odpowiedzi:</h6>
                <ul className="list-group">
                  {question.odpowiedzi.map((answer, answerIndex) => (
                    <li
                      key={answerIndex}
                      className={`list-group-item ${
                        question.poprawneOdpowiedzi.includes(answer)
                          ? "list-group-item-success"
                          : ""
                      }`}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
                <h6 className="card-subtitle my-2 text-muted">
                  Poprawne odpowiedzi:
                </h6>
                <ul className="list-group">
                  {question.poprawneOdpowiedzi.map(
                    (correctAnswer, correctAnswerIndex) => (
                      <li
                        key={correctAnswerIndex}
                        className="list-group-item list-group-item-success"
                      >
                        {correctAnswer}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DataDisplay;
