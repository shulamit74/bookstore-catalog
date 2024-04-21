import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import trashIcon from "../../icons8-trash.svg";
import "./styles.css";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loadMessage, setLoadMessage] = useState("Loading...");

  const getBook = async () => {
    try {
      const resp = await fetch(`http://localhost:5000/books/${id}`);
      const json = await resp.json();
      setBook(json);
    } catch (e) {
      console.error(e);
      setLoadMessage(`Error loading entry: ${e.message}`);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const goBack = () => {
    navigate("/");
  };

  const onDeletePopup = async (e) => {
    e.stopPropagation();
    const resp =
      window.confirm(`Are you sure you want to delete ${book.title} from the catalog? 
        This cannot be reverted!`);
    if (resp) {
      try {
        const resp = await fetch(`http://localhost:5000/books/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
        navigate("/");
      } catch (e) {
        console.error(e);
        setLoadMessage(`Error creating entry: ${e.message}`);
      }
    }
  };

  

  return (
    <div className="container">
      <div>
        {book
          ? Object.keys(book).map((key) => {
              return (
                <p key={key}>
                  <b>{key}</b>: {book[key]}
                </p>
              );
            })
          : loadMessage}
      </div>
      <div className="bottomIcons">
        <button className="back" onClick={goBack}>
          Back
        </button>
        <button className="deleteIcon" onClick={onDeletePopup}>
          <img src={trashIcon} alt="delete" className="trash"></img>
          Delete
        </button>
      </div>
    </div>
  );
};
export default BookPage;
