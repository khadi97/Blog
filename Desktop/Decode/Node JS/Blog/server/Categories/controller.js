const Categories = require('./Categories');

/// функция getAllGenres возвращает все жанры из базы.
const getAllCategories = async(req, res) => {
    const data = await Categories.find()
    res.send({data})
}

module.exports = {getAllCategories}