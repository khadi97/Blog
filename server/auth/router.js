const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signUp, signIn, signOut } = require('./controller');

router.post('/api/signup', signUp);
router.post('/api/signin',passport.authenticate('local', { failureRedirect: '/login?error=1' }), signIn);
router.get('/api/signout', signOut);


// Google OAuth
router.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.session) {
      req.session.userId = req.user._id;
      req.session.save(() => res.redirect('/my_blogs/' + req.user._id));
    } else {
      res.redirect('/my_blogs/' + req.user._id);
    }
  }
);


// GitHub OAuth
router.get('/api/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.session) {
      req.session.userId = req.user._id;
      req.session.save(() => res.redirect('/my_blogs/' + req.user._id));
    } else {
      res.redirect('/my_blogs/' + req.user._id);
    }
  }
);

module.exports = router;
