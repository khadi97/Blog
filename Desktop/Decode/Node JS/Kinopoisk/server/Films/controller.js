const Film = require('./Film')
const fs = require('fs')
const path = require('path')


const createFilm = async(req, res) => {
    console.log('Request body:', req.body); // Выводим тело запроса для отладки
    if (
        req.file &&
        req.body.titleRus && req.body.titleRus.length > 2 &&
        req.body.titleEng && req.body.titleEng.length > 2 &&
        req.body.year && req.body.year > 0 &&
        req.body.time && req.body.time > 10 &&
        req.body.country && req.body.country.length > 2 &&
        req.body.genre && req.body.genre.length > 2
    ) {
        await new Film({
            titleRus: req.body.titleRus,
            titleEng: req.body.titleEng,
            year: req.body.year,
            time: req.body.time,
            country: req.body.country,
            genre: req.body.genre,
            image: `/images/films/${req.file.filename}`,
            author: req.user._id
        }).save()
    
        res.redirect(`/admin/${req.user._id}`)
    } else {
        res.redirect('/new?error=1')
    }
}


const editFilm = async(req, res) => {
    if( req.file &&
        req.body.titleRus && req.body.titleRus.length > 2 &&
        req.body.titleEng && req.body.titleEng.length > 2 &&
        req.body.year && req.body.year > 0 &&
        req.body.time && req.body.time > 10 &&
        req.body.country && req.body.country.length > 0 &&
        req.body.genre && req.body.genre.length > 0)
        {
            const film = await Film.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public' + film.image))
            // film.titleRus = req.body.titleRus;
            // film.titleEng = req.body.titleEng;
            // film.year = req.body.year;
            // film.time = req.body.time;
            // film.country = req.body.country;
            // film.genre = req.body.genre;
            // film.image = `/images/films/${req.file.filename}`;
            // film.author = req.user._id;
            // film.save()
            await Film.findByIdAndUpdate(req.body.id, {
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id
            })
            res.redirect('/admin/' + req.user._id)
        } else {
            res.redirect(`/edit/${req.body.id}?error=1`)
        }
}

module.exports = { createFilm, editFilm }