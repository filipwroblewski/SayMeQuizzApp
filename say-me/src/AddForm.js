import React, { useState } from "react";
import { saveData, loadData } from "./DataStorage";

const AddForm = ({ onAddQuestion }) => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (index, event) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = event.target.value;
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerChange = (index, event) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[index] = event.target.value;
    setCorrectAnswers(updatedCorrectAnswers);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      kategoria: category,
      pytanie: question,
      odpowiedzi: answers,
      poprawneOdpowiedzi: correctAnswers,
    };

    onAddQuestion(newQuestion);

    const existingData = loadData("questions") || [];
    const updatedData = [...existingData, newQuestion];

    saveData("questions", updatedData);

    setCategory("");
    setQuestion("");
    setAnswers([""]);
    setCorrectAnswers([""]);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  return (
    <div>
      <h4>Dodaj pytanie i odpowiedź</h4>
      <div className="form-group">
        <label>Kategoria:</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="form-group">
        <label>Pytanie:</label>
        <input
          type="text"
          className="form-control"
          value={question}
          onChange={handleQuestionChange}
        />
      </div>
      <div className="form-group">
        <label>Odpowiedzi:</label>
        {answers.map((answer, index) => (
          <div className="input-group" key={index}>
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(event) => handleAnswerChange(index, event)}
            />
          </div>
        ))}
        <div className="d-flex justify-content-center mt-2">
          {" "}
          <button className="btn btn-secondary" onClick={handleAddAnswer}>
            Dodaj odpowiedź
          </button>
        </div>
      </div>
      <div className="form-group pt-4">
        <label>Poprawne odpowiedzi:</label>
        {correctAnswers.map((answer, index) => (
          <div className="input-group" key={index}>
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(event) => handleCorrectAnswerChange(index, event)}
            />
          </div>
        ))}
        <div className="d-flex justify-content-center mt-2">
          {" "}
          <button
            className="btn btn-secondary"
            onClick={handleAddCorrectAnswer}
          >
            Dodaj poprawną odpowiedź
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2 pt-4">
        {" "}
        <button className="btn btn-success" onClick={handleAddQuestion}>
          Dodaj pytanie
        </button>
      </div>
    </div>
  );
};

export default AddForm;
