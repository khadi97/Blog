// // создаем метод для рендеринга главной страницы index (надо создать обязательно папку views и ejs файл)

const express = require('express')
const router = express.Router();
const Genres = require('../Genres/Genres')
const Country = require('../Country/Country')
const User = require('../auth/User')
const Film = require('../Films/Film')

router.get('/', async(req, res) => {
    const allGenres = await Genres.find()
    const films = await Film.find().populate('genre').populate('country')
    res.render('index', {genres: allGenres, user: req.user ? req.user : {}, films})
})

router.get('/login', (req, res) => {
    res.render('login', {user: req.user ? req.user : {}})
})

router.get('/register', (req, res) => {
    res.render('register', {user: req.user ? req.user : {}})
})

router.get('/profile/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id)
    console.log(user._id);
    console.log(req.user._id);
    if(user){
        res.render('profile', {user: user, genres: allGenres, loginUser: req.user})
    }else{
        res.redirect('/not-found')
    }
})

router.get('/admin/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const user = await User.findById(req.params.id)
    const films = await Film.find().populate('genre').populate('country').populate('author')
    // console.log(req.user);
    res.render('adminProfile', {user: user, genres: allGenres, loginUser: req.user ? req.user:{}, films: films})
})

router.get('/new', async(req, res) => {
    // console.log(req.user);
    const allGenres = await Genres.find()
    const allCounties = await Country.find()
    res.render('newFilm', {genres: allGenres, countries: allCounties, user: req.user ? req.user : {}})
})


router.get('/edit/:id', async(req, res) => {
    const allGenres = await Genres.find()
    const allCounties = await Country.find()
    const film = await Film.findById(req.params.id)
    res.render('editFilm', {genres: allGenres, countries: allCounties, user: req.user ? req.user : {}, film})
})


router.get('/not-found', (req, res) => {
    res.render('notFound')
})


module.exports = router;