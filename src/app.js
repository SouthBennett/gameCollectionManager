// import express
import express from 'express';

import indexRouter from './routers/indexRoutes.js';
import gamesRouter from './routers/gamesRoutes.js';

import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';


// create instance of express app
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// Makes files in /public accessible via browser (e.g., /styles.css, /script.js)
app.use(express.static('public'));

// ===================
// COOKIE PARSER
// ===================
app.use(cookieParser());

// ===================
// SESSION SETUP
// ===================
app.use(session({
  secret: 'secretkey', // change later
  resave: false,
  saveUninitialized: false
}));

// ====================
// PASSPORT SETUP
// ====================
app.use(passport.initialize());
app.use(passport.session());

// set EJS as view engine
app.set('view engine', 'ejs');

// tell Express where views are located
app.set('views', './src/views');

// mounting use routes (all routes starting with / go through indexRoutes)
app.use('/', indexRouter);
app.use('/games', gamesRouter);

// export app so server.js can use it
export default app;