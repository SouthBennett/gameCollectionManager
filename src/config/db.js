// import mysql2 library (this lets Node talk to MySQL)
import mysql from 'mysql2';

// create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',      // database is running locally (Docker exposed it)
  port: 3307,             // IMPORTANT: Docker port, not default 3306
  user: 'root',           // MySQL username
  password: 'rootpass',   // password I set in docker run
  database: 'gaming_collection' // the DB name 
});

// attempt to connect to the databawswe
db.connect ((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    // if connection succeeds, print success message
    console.log('Connected to MySQL database');
  }
});

// export the connectio so other files can use it 
export default db;