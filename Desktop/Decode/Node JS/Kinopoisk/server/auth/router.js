const express = require('express'); //Подключаем библиотеку express, которая используется для создания API.
const passport = require('passport') //для сопоставления паролей
const router = express.Router(); //Создаем объект router для обработки HTTP-запросов.
const {signUp, signIn, signOut} = require('./controller')
const createAdmin = require('../Admin/seed')

router.post('/api/signup', signUp)
router.post('/api/signin', passport.authenticate('local' , {failureRedirect: '/login/?error=1'}), signIn)
router.get('/api/signout', signOut)

createAdmin();

module.exports = router;