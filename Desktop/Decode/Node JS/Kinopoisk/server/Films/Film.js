const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Создаем схему для жанров
const FilmSchema = new mongoose.Schema({
    titleRus: String, // Название жанра
    titleEng: String, // Уникальный идентификатор жанра
    year: Number,
    time: String,
    country: {type: Schema.Types.ObjectId, ref: 'country'},
    genre: {type: Schema.Types.ObjectId, ref: 'genre'},
    image: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
    
})

// Экспортируем модель, чтобы использовать её для работы с базой данных
module.exports = mongoose.model('film', FilmSchema)