const express = require('express') // библ для создания API
const passport = require('passport') //для сопоставления паролей
const router = express.Router() // объект для обработки HTTP-запросов
const {signUp, signIn, signOut} = require('./controller')

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local' , {failureRedirect: '/login/?error=1'}), signIn)
router.get('/api/signout', signOut)


module.exports = router;