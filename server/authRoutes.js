import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
    if (!user) {
      console.error('Authentication failed:', info.message);
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }
    res.send({ success: true, user: user });
  })(req, res, next);
});

export default router;
