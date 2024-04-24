import React, { useState, useEffect } from "react";
import BookRow from "../../components/BookRow/BookRow";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import plusIcon from "../../plus-svgrepo-com.svg"


const booksUrl = "http://localhost:5000/books";

const MainPage = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState(null);
  const [loadMessage, setLoadMessage] = useState("Loading...");

  const loadBooks = async () => {
    try {
      const response = await fetch(booksUrl);
      const bookJson = await response.json();
      setBooks(bookJson);
    } catch (e) {
      setLoadMessage(`Request failed: ${e.message}. reload to retry.`);
    }
  };

  const addBook = () => {
    navigate("/book/new")
  }
  useEffect(() => {
    loadBooks();
  }, []);
  return (
    <div className="mainPage">
      <header className="header">
        <div>My Bookstore catalog</div>
        <button className="addButton" onClick={addBook}>
            <img src={plusIcon} className="plus" alt="add"/>
            Add book
        </button>
      </header>
      
      <div>
        {books
          ? books.map((book, idx) => {
              return <BookRow book={book} key={idx} />;
            })
          : `${loadMessage}`}
      </div>
    </div>
  );
};
export default MainPage;
