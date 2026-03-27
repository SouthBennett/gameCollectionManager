// import database connection
import db from '../config/db.js';

//controller function to get all games
export const getAllGames = (req, res) => {
  // SQL query to get all games
  const query = 'SELECT * FROM games';

  // execute query
  db.query(query, (err, results) => {
    if (err) {
      // if error occurs, send error response
      console.error('Error fetching games:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    //send results back as JSON
    res.json(results);
  });
};