const isAuth = (req, res, next) => {
    console.log(req.user);
    if(req.user && req.user._id){
        next()
    } else {
        return res.redirect('/new_blogs?unauthorized');
        // res.status(401).send('Unauthorized')
    }
    
}

module.exports = { isAuth };