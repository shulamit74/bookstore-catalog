import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
const BookRow = ({ book }) => {
  const navigate = useNavigate();
  const goToBook = (e) => {
    e.preventDefault();
    navigate(`/book/${book.id}`);
  };

  return (
    <div onClick={goToBook} className="book">
      <div>
        {book.title} | {book.author} | {book.publication_date.split("-")[0]}
      </div>
    </div>
  );
};

export default BookRow;
