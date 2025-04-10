
const mongoose = require('mongoose')

// Создаем схему для жанров
const GenreSchema = new mongoose.Schema({
    name: String, // Название жанра
    key: Number // Уникальный идентификатор жанра
})

// Экспортируем модель, чтобы использовать её для работы с базой данных
module.exports = mongoose.model('genre', GenreSchema)