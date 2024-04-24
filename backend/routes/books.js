const express = require("express");
const router = express.Router();
const { client } = require('../db/initDB');

router.get("/", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM books');
    const books = result.rows;
    res.json(books);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await client.query('SELECT * FROM books WHERE id = $1', [bookId]);
    const book = result.rows[0];
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/", async (req, res) => {
  const { title, description, author, publication_date, genre, price } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO books (title, description, author, publication_date, genre, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, author, publication_date, genre, price]
    );
    const newBook = result.rows[0];
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);
    const deletedBook = result.rows[0];
    if (deletedBook) {
      res.json(deletedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;