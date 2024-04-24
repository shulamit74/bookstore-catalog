import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const genres = [
  "Science fiction",
  "Satire",
  "Drama",
  "Action",
  "Romance",
  "Mystery",
  "Horror",
];

const bookKeys = {
  title: { label: "Title", type: "text" },
  description: { label: "Description", type: "text" },
  author: { label: "Author", type: "text" },
  publication_date: { label: "Publication Date", type: "date" },
  genre: { label: "Genre", type: "select", options: genres },
  price: { label: "Price", type: "number", step: "0.01" },
};

const AddPage = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [loadMessage, setLoadMessage] = useState('');

  const addBook = async () => {
    try {
     await fetch(`http://localhost:5000/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      navigate("/");
    } catch (e) {
      console.error(e);
      setLoadMessage(`Error creating entry: ${e.message}`);
    }
  };

  useEffect(() => {
    const hasAll = Object.keys(bookKeys).every(
      (key) => book[key] && book[key].length > 0
    );
    setCanSubmit(hasAll);
  }, [book]);

  const goBack = () => {
    navigate("/");
  };

  const onInputChanged = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <header className="header">Add new book</header>
      <div className="form">
        {Object.keys(bookKeys).map((key) => {
          const { label, type, options, step } = bookKeys[key];
          return (
            <div className="formRow" key={key}>
              <div className="formInputTitle">{label}:</div>
              {type === "select" ? (
                <select name={key} onChange={onInputChanged}>
                  <option value="">Select {label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={key}
                  type={type}
                  step={step}
                  onChange={onInputChanged}
                />
              )}
            </div>
          );
        })}
      </div>
      <div>{loadMessage}</div>
      <div className="bottomIcons">
        <button className="back" onClick={goBack}>
          Back
        </button>
        <button className="submitIcon" onClick={addBook} disabled={!canSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default AddPage;
