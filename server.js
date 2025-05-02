const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

//основаная настройка для сохранений сессии
app.use(session({
    name: 'kinopoisk.session',
    secret: 'keybord cat', //секретный ключ , будем скрывать инфо о залогиневшемся пользователе
    maxAge: 1000 * 60 * 60 *7, //макс длительность хранения сессий (1000миллисекунд, 60сек, 60мин, 7дней), условно говоря 1день*7дней
    resave: false,//чтобы каждый раз инфо не обновлялась
    store: mongooseStore.create({ //связываем сессию с connect-mongo
        mongoUrl: 'mongodb://localhost:27017' //ссылку берем в папке server/config/db.js
    })
}))
//настройки для passport
app.use(passport.initialize())
app.use(passport.session())

//для хранения ejs файлов
app.set('view engine', 'ejs');


//подключение db.js и passport и router.js
require('./server/config/db')
require('./server/config/passport')

app.use(require('./server/Categories/router'))
app.use(require('./server/pages/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Blogs/router'))
app.use(require('./server/Comments/router'))

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})