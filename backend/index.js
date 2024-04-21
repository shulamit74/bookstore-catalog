const express = require("express");
const app = express();
const cors = require("cors");
const { clientWithDB, setupDatabase } = require('./db/initDB'); // Import the client and setupDatabase function
const port = 5000;

// Allow requests from React app
app.use(cors({ origin: ["http://localhost:3000"] }));

// Body parsing middleware
app.use(express.json());

// Initialize the server
async function initializeServer() {
  try {
    // Set up the database
    await setupDatabase();
    
    // Get all books
    app.get("/books", async (req, res) => {
      try {
        const result = await clientWithDB.query('SELECT * FROM books');
        const books = result.rows;
        res.json(books);
      } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
      }
    });

    // Get a book by ID
    app.get("/books/:id", async (req, res) => {
      const bookId = req.params.id;
      try {
        const result = await clientWithDB.query('SELECT * FROM books WHERE id = $1', [bookId]);
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

    // Add a new book
    app.post("/books", async (req, res) => {
      const { title, description, author, publication_date, genre, price } = req.body;
      try {
        const result = await clientWithDB.query(
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

    // Delete a book by ID
    app.delete("/books/:id", async (req, res) => {
      const bookId = req.params.id;
      try {
        const result = await clientWithDB.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);
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

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1); // Exit the process if an error occurs during initialization
  }
}

// Call the initialization function
initializeServer();