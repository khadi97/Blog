const User = require('./User')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
    // Проверка на пустые поля
    if (!req.body.email || 
        !req.body.fullname ||
        !req.body.password ||
        !req.body.re_password) {
        return res.redirect('/register?error=1');
    }
    
    // Проверка, что пароли совпадают
    if (req.body.password !== req.body.re_password) {
        return res.redirect('/register?error=2');
    }

    // Проверка, есть ли уже такой пользователь
    const userExists = await User.findOne({ email: req.body.email }).countDocuments();
    if (userExists) {
        return res.redirect('/register?error=3');
    }

    // Хеширование пароля
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Сохраняем пользователя в базе данных
        const newUser = new User({
            email: req.body.email,
            fullname: req.body.fullname,
            password: hashedPassword
        });

        await newUser.save();

        return res.redirect('/login'); // Редиректим после успешной регистрации
    } catch (err) {
        console.error("Ошибка при регистрации:", err);
        return res.status(500).send("Произошла ошибка при регистрации");
    }
};


const signIn = (req, res) => {
        res.redirect(`/my_blogs/${req.user._id}`)
}


const signOut = (req, res) => {
    req.logout(function(err){ // Выход из системы. Функция req.logout() удаляет данные сессии пользователя
        // Если при выходе возникла ошибка, она будет выведена в консоль.
        if(err){
            console.log(err);
        }
    })
    res.redirect('/') //редиректим на глав страницу после выхода юзера из своего аккаунта
}


module.exports = {signUp, signIn, signOut}
