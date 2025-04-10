const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')


passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user => {
            if (!user) {
                return done(null, false, { message: 'Пользователь не найден' }); // Пользователь не найден
            }

            // Если пользователь найден, продолжаем проверку пароля
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(err) {
                        return done(err); // Ошибка при сравнении пароля
                    }
                    if(result) {
                        return done(null, user); // Успешная аутентификация
                    } else {
                        return done(null, false, { message: 'Неверный пароль' }); // Неверный пароль
                    }
                })
            } else {
                return done(null, false, { message: 'Пароль не существует для пользователя' }); // Отсутствует пароль у пользователя
            }
        }).catch(e => {
            return done(e); // Обработка ошибок из запроса к базе данных
        })
    }
));

passport.serializeUser(function(user, done){
    console.log(user);
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    console.log(id);
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})
