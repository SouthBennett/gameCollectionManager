import express from 'express';
import passport from 'passport';

const router = express.Router();

// =====================
// LOGIN ROUTE
// =====================
router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// =====================
// LOGOUT ROUTE
// =====================
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

export default router;