const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')


router.get('/', async (req, res) => {
    const options = {};
    const { catId, search, page = 0 } = req.query;

    // Для пагинаций
    const limit = 3;
    const currentPage = parseInt(page) || 0;

    let selectedCategory = null;

    // Поиск по категории
    if (catId) {
        const category = await Categories.findOne({ key: catId });
        if (category) {
            options.category = category._id;
            selectedCategory = catId;
            res.locals.category = catId;
        }
    }

    // Поиск по заголовку
    if (search && search.trim().length > 0) {
        options.$or = [
            { title: new RegExp(search, 'i') }
        ];
        res.locals.search = search;
    }

    // Подсчет количества отфильтрованных блогов
    const totalBlogs = await Blog.countDocuments(options)

    const blogs = await Blog.find(options) .limit(limit).skip(currentPage * limit).populate('category').populate('author')
    const allCategories = await Categories.find()
    res.render('index', {categories: allCategories, blogs, user: req.user || {}, selectedCategory, pages: Math.ceil(totalBlogs / limit),currentPage});
});


router.get('/login', (req, res) => {
    res.render('login', {user: req.user ? req.user : {}})
});

router.get('/register', (req, res) => {
    res.render('register', {user: req.user ? req.user : {}})
});


router.get('/my_blogs/:id', async (req, res) => {
    const allCategories = await Categories.find();
    try {
        // Ищем пользователя по ID, переданному в URL
        const user = await User.findById(req.params.id);

        if (!user) {
            // Если пользователь не найден, перенаправляем на страницу not-found
            return res.redirect('/not-found');
        }

        // Ищем блоги этого пользователя
        const blogs = await Blog.find({ author: user._id }).populate('category').populate('author');

        // Отправляем данные в шаблон
        res.render('my_blogs', {
            categories: allCategories,
            user: req.user ? req.user : {}, // Текущий авторизованный пользователь
            loginUser: req.user, // Текущий пользователь, вошедший в систему
            blogs
        });
    } catch (e) {
        console.error(e);
        res.redirect('/not_found'); // В случае ошибки перенаправляем на страницу "Не найдено"
    }
});


router.get('/new_blogs', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('new_blogs', {categories: allCategories, user: req.user ? req.user : {}})
});


router.get('/profile_comments', async(req, res) => {
    const options = {};
    const { catId } = req.query;
    let selectedCategory = null; 
    if (catId) {
        const category = await Categories.findOne({ key: catId });
        if (category) {
            options.category = category._id; 
            selectedCategory = catId;  
        }
    }

    const allCategories = await Categories.find()
    const blogs = await Blog.find(options).populate('category').populate('author')
    res.render('profile_comments', {categories: allCategories, user: req.user ? req.user : {}, blogs, selectedCategory })
});


router.get('/loggedout_comments', async(req, res) => {
    const options = {};
    const { catId } = req.query;
    let selectedCategory = null; 
    if (catId) {
        const category = await Categories.findOne({ key: catId });
        if (category) {
            options.category = category._id; 
            selectedCategory = catId;  
        }
    }

    const allCategories = await Categories.find()
    const blogs = await Blog.find(options).populate('category').populate('author')
    res.render('loggedout_comments', {categories: allCategories, user: req.user ? req.user : {}, blogs, selectedCategory})
});


router.get('/edit_blogs/:id', async(req, res) => {
    const allCategories = await Categories.find()
    const blogs = await Blog.findById(req.params.id)
    res.render('edit_blogs', {categories: allCategories, user: req.user ? req.user : {}, blogs}) //при рендеринге каждой страницы отправляю юзера
});


router.get('/not_found', (req, res) => {
    res.render('not_found')
});


router.get('/blog_details/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('category').populate('author')
    if (!blog){
        return res.redirect('/not_found')
    }

    const allCategories = await Categories.find()
    res.render('blog_details', {item: blog, categories: allCategories, user: req.user ? req.user : {}})
});


module.exports = router;