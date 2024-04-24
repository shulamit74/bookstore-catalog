const express = require("express");
const app = express();
const cors = require("cors");
const bookRoutes = require("./routes/books");
const { setupDatabase } = require("./db/initDB");
const port = 5000;

// Allow requests from React app
app.use(cors({ origin: ["http://localhost:3000"] }));

// Body parsing middleware
app.use(express.json());

// Use routes
app.use("/books", bookRoutes);

async function startServer() {
  try {
    await setupDatabase();
    console.log("Database initialized");

    // Start the server
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}
startServer();
