// import database connection
import db from '../config/db.js';

/** Controller function to get all games */
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

/** Controller function to add a new game */
export const addGame = (req, res) => {
  // extract data from request body
  const { title, platform, hours_played, completed, user_id } = req.body;

  // SQL query with placeholders (?) to prevent sql injection
  const query = `
    INSERT INTO games (title, platform, hours_played, completed, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  // values to insert into query
  const values = [title, platform, hours_played, completed, user_id];

  // execute query
  db.query(query, values, (err, result) => {
    if (err) {
      // handle error 
      console.error('Error inserting game: ', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // send success reponse
    res.status(201).json({
      message: 'Games add succesfully',
      gameId: result.insertId
    });
  });

  console.log(req.body);
};

/** Controller function to delete a game by ID */
export const deleteGame = (req, res) => {
  // get id from URL params
  const { id } = req.params;

  // SQL query
  const query = 'DELETE FROM games WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting game: ', err);
      return res.status(500).json({ error: 'Database error'});
    }

    // Check if any row was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Success response
    res.json({ message: 'Game deleted succesfully '});
  });
};

/** Controller function to update a game / edit a game (hours, completed, etc.) */
export const updateGame = (req, res) => {

  // get id from URL
  const { id } = req.params;

  // get updated data from request body
  const { title, platform, hours_played, completed, user_id } = req.body;

  // SQL query
  const query = `
    UPDATE games
    SET title = ?, platform = ?, hours_played = ?, completed = ?
    WHERE id = ?
  `;

  // destructuring values in order of placeholdrs
  const values = [title, platform, hours_played, completed, id];

  // execute query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating game:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // if no rows affect, game not found
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Game not found'});
    }

    // success response
    res.status(200).json({ message: 'Game updated succesfully'});
  });
};