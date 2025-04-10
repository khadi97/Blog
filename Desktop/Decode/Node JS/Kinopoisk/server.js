const express = require('express')
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')


// вызов функции express()
const app = express();

//подключение db.js
require('./server/config/db')
require('./server/config/passport')


app.use(express.static(__dirname + '/public')) // чтобы сразу заходить в папку public
app.use(express.urlencoded({ extended: true }));//при использовании метода post нужно 

//используем express-session
app.use(session({
    name: 'kinopoisk.session',
    secret: 'keybord cat',
    maxAge: 1000 * 60 * 60 *7, //макс длительность хранения сессий
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://localhost:27017'
    })
}))
app.use(passport.initialize())
app.use(passport.session())


// чтобы успешно читались файлы ejs
app.set('view engine', 'ejs') 

// подключение router.js
app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Films/router'))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
})
