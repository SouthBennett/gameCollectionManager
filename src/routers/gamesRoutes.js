import express from 'express';

import { getAllGames, addGame, deleteGame, updateGame } from '../controllers/gamesController.js';

const router = express.Router();

// GET all games
router.get('/', getAllGames);

// POST new game 
router.post('/', addGame);

// DELETE game
router.delete('/:id', deleteGame);

// PUT update game
router.put('/:id', updateGame);

export default router;