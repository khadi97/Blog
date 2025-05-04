// Middleware для защиты маршрутов
const isAuth = (req, res, next) => {
    if (req.user && req.user._id) {
        next();
    } else {
        res.redirect('/new_blogs?unauthorized');
        // res.redirect('/login'); 
    }
};

module.exports = { isAuth };
