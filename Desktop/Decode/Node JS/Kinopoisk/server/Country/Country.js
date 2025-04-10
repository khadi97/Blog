const mongoose = require('mongoose')

//Создаем схему/модель
const CountrySchema = new mongoose.Schema({
    name: String,
    key: Number
})

module.exports = mongoose.model('country', CountrySchema)