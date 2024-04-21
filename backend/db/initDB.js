const { Client } = require('pg');
const books = require("./sample_books.json");

const DB_NAME = process.env.DB_NAME || "books";
const DB_USER = process.env.DB_USER || "postgres";
const DB_HOST = "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const TABLE_NAME = "books";


// Reconnect to the newly created database
let clientWithDB = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: 5432,
  database: DB_NAME // Specify the newly created database name here
});

async function setupDatabase() {
  try {
    // Create a client instance
const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: 5432,
  database: 'postgres' // Connect to default postgres database initially
});
    // Connect to the database

    await client.connect();

    // Check if the database exists
    const res = await client.query(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`
    );

    if (res.rowCount === 0) {
      console.log(`${DB_NAME} database not found, creating it.`);
      await client.query(`CREATE DATABASE "${DB_NAME}";`);
      console.log(`created database ${DB_NAME}.`);

      // Disconnect from the default database
      await client.end();

      await clientWithDB.connect();

      // Create the table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS "${TABLE_NAME}" (
          ID SERIAL PRIMARY KEY,
          title TEXT,
          author TEXT,
          publication_date TEXT,
          description TEXT,
          genre TEXT,
          price NUMERIC
        );
      `;
      await clientWithDB.query(createTableQuery);
      console.log(`Created table ${TABLE_NAME}.`);

      // Insert sample books
      for (const book of books) {
        const insertQuery = `
          INSERT INTO "${TABLE_NAME}" (title, description, author, publication_date, genre, price)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [
          book.title,
          book.description,
          book.author,
          book.publication_date,
          book.genre,
          book.price,
        ];

        await clientWithDB.query(insertQuery, values);
        console.log(`Inserted book "${book.title}" into table ${TABLE_NAME}.`);
      }
      
      // Disconnect from the database
      //await clientWithDB.end();
    } else {
      await clientWithDB.connect();
      console.log(`${DB_NAME} database already exists.`);
    }
  } catch (err) {
    console.error('Error setting up database', err);
  }
}

// Export the client instance
module.exports = { clientWithDB, setupDatabase };