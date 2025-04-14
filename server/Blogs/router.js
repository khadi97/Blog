const express = require('express')
const router = express.Router()
const {createBlog, editBlog} = require('./controller')
const {upload} = require('./multer')
const {isAuth} = require('../auth/middlewares')

router.post('/api/blogs/new', isAuth, upload.single('image'), createBlog)
router.post('/api/blogs/edit', isAuth, upload.single('image'), editBlog)

module.exports = router