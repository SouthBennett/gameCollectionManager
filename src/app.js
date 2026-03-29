// import express
import express from 'express';

import indexRouter from './routers/indexRoutes.js';
import gamesRouter from './routers/gamesRoutes.js';

// create instance of express app
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// set EJS as view engine
app.set('view engine', 'ejs');

// tell Express where views are located
app.set('views', './src/views');

// mounting use routes (all routes starting with / go through indexRoutes)
app.use('/', indexRouter);
app.use('/games', gamesRouter);

// export app so server.js can use it
export default app;