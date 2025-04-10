const Genres = require('./Genres');

/// функция getAllGenres возвращает все жанры из базы.
const getAllGenres = async(req, res) => {
    const data = await Genres.find()
    res.send({data})
}

module.exports = {getAllGenres}