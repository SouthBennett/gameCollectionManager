// import mysql2 library (this lets Node talk to MySQL)
import mysql from 'mysql2/promise';

// create a connection to the database
const db = mysql.createPool({
  host: 'localhost',      // database is running locally (Docker exposed it)
  port: 3307,             // IMPORTANT: Docker port, not default 3306
  user: 'root',           // MySQL username
  password: 'rootpass',   // password I set in docker run
  database: 'gaming_collection' // the DB name 
});

// attempt to connect to the databawswe
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Database connection failed:', error)
  }
})();


// export the connectio so other files can use it 
export default db;