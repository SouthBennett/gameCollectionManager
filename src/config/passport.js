// import passport + strategy
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from './db.js'; // adjust if needed

// ==========================
// LOCAL STRATEGY (LOGIN)
// ==========================
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('LOGIN ATTEMPT:', username, password);
    // find user by username
      const [rows] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );

      // user not found
      if (rows.length === 0) {
        return done(null, false, { message: 'User not found'})
      }

      const user = rows[0];

      console.log('FOUND USER:', user);

      // Temp: plain password check (replace later with bcrypt)
      if (user.password !== password) {
        console.log("PASSWORD MISMATCH");
        return done(null, false, { message: 'Incorrect password'})
      }

      // success 
      console.log("LOGIN SUCCESS!");
      return done(null, user);

    } catch (error) {
      console.log("ERROR:", error);
      return done(error);
    }
  }
));

// =========================
// SERIALIZE USER
// =========================
passport.serializeUser((user, done) => {
  // store user id in session
  done(null, user.id);
});

// =========================
// DESERIALIZE USER
// =========================
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    done(null, rows[0]);

  } catch (error) {
    done(error)
  }
});

export default passport;