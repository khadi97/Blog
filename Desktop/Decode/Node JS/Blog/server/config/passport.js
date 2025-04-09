const passport = require('passport');
const User = require('../auth/User');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  function(email, password, done) {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Пользователь не найден' }); // Если юзер не найден
        }

        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            return done(err); // Если произошла ошибка при сравнении пароля
          }
          if (result) {
            return done(null, user); // Если пароль совпал, юзео аутентифицирован
          } else {
            return done(null, false, { message: 'Неверный пароль' }); // Если пароль не совпал
          }
        });
      })
      .catch(e => {
        return done(e); // Обработка ошибок базы данных или сервера
      });
  }
));

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user._id); // Сохраняем только ID юзера в сессии
});

passport.deserializeUser(function(id, done) {
  console.log(id);
  User.findById(id)
    .then(user => {
      done(null, user); // Находим юзера по ID и передаем его в сессию
    })
    .catch(err => {
      done(err, null); // Если ошибка при поиске юзера
    });
});
