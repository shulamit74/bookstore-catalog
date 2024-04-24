## BOOK CATALOG

A react app with node js backend and postgres DB.
There are 2 ways to run the app:

### Option A: Use Docker compose 
 1. Clone the repo and CD into it
 2. Type `docker-compose up`
 3. Should start 3 services: posgres DB with sample books, node js backend app and front-end react app.
 4. The catalog should be available at `http://localhost:3000`

### Option B: Manually
 1. Clone the repo and CD into it.
 2. Start local Postgres server.
 3. Run manually the SQL in `database-seed.sql`
 4. Change the credentials in `backend/initDB.js` to match your DB.
 5. In `backend` folder, run: 
 `npm install` and `node index.js` to start the server.
 6. In `frontend` folder, run: 
 `npm install` and `npm run start` to start the server.
 

