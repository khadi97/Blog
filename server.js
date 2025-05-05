const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
require('dotenv').config();


const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Настройка сессий с использованием connect-mongo
app.use(session({
    name: 'blog.session',
    secret: 'keyboard cat',// секретный ключ для шифрования сессий
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },// срок действия сессии (7 дней)
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/blog',// URL подключения к MongoDB
      dbName: 'blog',
      collectionName: 'sessions'
    })
  }));


// Настройка Passport.js
app.use(passport.initialize());
app.use(passport.session());


// Настройка EJS для отображения шаблонов
app.set('view engine', 'ejs');

// Подключаем файл маршрутов
require('./server/config/db');
require('./server/config/passport'); // Настройка passport для локальной и OAuth авторизации
app.use(require('./server/Categories/router'));
app.use(require('./server/pages/router'));
app.use(require('./server/auth/router'));
app.use(require('./server/Blogs/router'));
app.use(require('./server/Comments/router'));


// Старт сервера
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});