const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Categories = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blogs/Blog')
const Comment = require('../Comments/Comments')
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    const options = {};
    const { catId, search, page = 0 } = req.query;

    // Для пагинаций
    const limit = 3;
    const currentPage = parseInt(page) || 0;

    let selectedCategory = null;

    // Фильтрация по категории
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

    const blogs = await Blog.find(options).limit(limit).skip(currentPage * limit).populate('category').populate('author')
    const allCategories = await Categories.find()
    res.render('index', {
        categories: allCategories,
        blogs, 
        user: req.user || {}, 
        selectedCategory, 
        pages: Math.ceil(totalBlogs / limit),
        currentPage});
});


router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user ? req.user : {}})
});

router.get('/register', (req, res) => {
    res.render('register', {
        user: req.user ? req.user : {}})
});


router.get('/my_blogs/:id', async (req, res) => {
    const options = {};
    const { search, page = 0 } = req.query;

    // Для пагинаций
    const limit = 3;
    const currentPage = parseInt(page) || 0;

    // Поиск по заголовку
    if (search && search.trim().length > 0) {
        options.$or = [
            { title: new RegExp(search, 'i') }
        ];
        res.locals.search = search;
    }

    const allCategories = await Categories.find();
    try {
        // Ищем пользователя по ID, переданному в URL
        const user = await User.findById(req.params.id);

        if (!user) {
            // Если пользователь не найден, перенаправляем на страницу not-found
            return res.redirect('/not-found');
        }

        // Подсчет количества отфильтрованных блогов
        const totalBlogs = await Blog.countDocuments({author: user._id, ...(options.$or ? { $or: options.$or } : {})}) // Подсчет количества блогов текущего пользователя с учетом поиска

        // Ищем блоги этого пользователя
        const blogs = await Blog.find({author: user._id, ...(options.$or ? { $or: options.$or } : {})}).limit(limit).skip(currentPage * limit).populate('category').populate('author');
   
        // Отправляем данные в шаблон
        res.render('my_blogs', {
            categories: allCategories,
            user: req.user ? req.user : {}, // Текущий авторизованный пользователь
            loginUser: req.user, // Текущий пользователь, вошедший в систему
            blogs,
            pages: Math.ceil(totalBlogs / limit),
            currentPage
        });
    } catch (e) {
        console.error(e);
        res.redirect('/not_found'); // В случае ошибки перенаправляем на страницу "Не найдено"
    }
});


router.get('/new_blogs', async(req, res) => {
    const allCategories = await Categories.find()
    res.render('new_blogs', {
        categories: allCategories,
        user: req.user ? req.user : {}})
});


router.get('/edit_blogs/:id', async(req, res) => {
    const allCategories = await Categories.find()
    const blogs = await Blog.findById(req.params.id)
    res.render('edit_blogs', {
        categories: allCategories, 
        user: req.user ? req.user : {}, 
        blogs}) //при рендеринге каждой страницы отправляю юзера
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
    const comments = await Comment.find({ blogId: req.params.id }).populate('authorId');

    res.render('blog_details', {
        item: blog, 
        categories: allCategories, 
        user: req.user ? req.user : {},
        comments: comments})
});


router.get('/profile/edit', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    res.render('edit_profile', { user: req.user });
});


router.post('/profile/edit', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }

    const { fullname, bio, password, re_password } = req.body;

    try {
        const user = await User.findById(req.user._id);

        user.fullname = fullname;
        user.bio = bio;

        if (password || re_password) {
            if (password !== re_password) {
                return res.redirect('/profile/edit?error=1'); // пароли не совпадают
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        await user.save();

        // Обновляем сессию с новыми данными
        req.login(user, (err) => {
            if (err) {
                console.error("Ошибка при обновлении сессии:", err);
                return res.redirect('/profile/edit?error=2');
            }
            res.redirect(`/my_blogs/${req.user._id}`);
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;