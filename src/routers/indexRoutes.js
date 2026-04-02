// import express
import express from 'express';
//import controller functions
import { home, loginPage } from '../controllers/indexController.js';

// create router
const router = express.Router();

// define GET route for "/"
router.get('/', home);

router.get('/login', loginPage);

// export router so app.js can use it
export default router;