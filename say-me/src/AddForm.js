// AddForm.js

import React, { useState } from "react";
import { saveData, loadData } from "./DataStorage";

const AddForm = ({ onAddQuestion }) => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

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

    const existingData = loadData("questions") || []; // Retrieve existing "questions" data
    const updatedData = [...existingData, newQuestion]; // Merge existing data with new question

    saveData("questions", updatedData); // Save the updated data

    setCategory("");
    setQuestion("");
    setAnswers([]);
    setCorrectAnswers([]);
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
          <input
            key={index}
            type="text"
            className="form-control"
            value={answer}
            onChange={(event) => handleAnswerChange(index, event)}
          />
        ))}
        <button
          className="btn btn-secondary mt-2"
          onClick={() => setAnswers([...answers, ""])}
        >
          Dodaj odpowiedź
        </button>
      </div>
      <div className="form-group">
        <label>Poprawne odpowiedzi:</label>
        {correctAnswers.map((answer, index) => (
          <input
            key={index}
            type="text"
            className="form-control"
            value={answer}
            onChange={(event) => handleCorrectAnswerChange(index, event)}
          />
        ))}
        <button
          className="btn btn-secondary mt-2"
          onClick={() => setCorrectAnswers([...correctAnswers, ""])}
        >
          Dodaj poprawną odpowiedź
        </button>
      </div>
      <button className="btn btn-success mt-2" onClick={handleAddQuestion}>
        Dodaj pytanie
      </button>
    </div>
  );
};

export default AddForm;
