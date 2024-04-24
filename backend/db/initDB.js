const { Client } = require("pg");

const DB_HOST = process.env.DB_HOST || "postgres";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";

// Create a client instance for connecting to the default postgres database
const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: 5432,
  database: "postgres",
});

async function setupDatabase() {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error setting up database", err);
  }
  return client;
}

// Export the setupDatabase function
module.exports = { setupDatabase, client };
