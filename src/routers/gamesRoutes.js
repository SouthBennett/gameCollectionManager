import express from 'express';

import { getAllGames } from '../controllers/gamesController.js';

const router = express.Router();

router.get("/", getAllGames);

export default router;