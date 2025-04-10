const express = require('express')
const router = express.Router()
const {createFilm, editFilm} = require('./controller')
const {upload} = require('./multer')
const {isAuth} = require('../auth/middlewares')

router.post('/api/films/new', isAuth, upload.single('image'), createFilm)
router.post('/api/films/edit', isAuth, upload.single('image'), editFilm)

module.exports = router