// import at the Expres app (configured in app.js)
import app from "./app.js";
// import dotenv to read environment variables from .env file
import dotenv from "dotenv";
//import database connection (this runs db.connect)
import db from './config/db.js';

// load environment variables
dotenv.config();

// get port from .env OR default to 3000
const port = process.env.PORT || 3000;

// start the server
app.listen(port, () => {
  console.log(`Server is lstening at localhost: http://localhost:${port}`);
})