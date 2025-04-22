const isAuth = (req, res, next) => {
    if (req.user && req.user._id) {
        next();
    } else {
        res.redirect('/new_blogs?unauthorized');
    }
};

module.exports = { isAuth };
