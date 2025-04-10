const express = require('express'); //Подключаем библиотеку express, которая используется для создания API.
const router = express.Router(); //Создаем объект router для обработки HTTP-запросов.
const {getAllGenres} = require('./controller'); // Импортируем функцию для получения жанров
const writeDataGenre = require('./seed') // Импортируем функцию для добавления жанров

// Вызов функции writeDataGenre для добавления данных в базу
// Мы вызываем функцию writeDataGenre(), 
// чтобы, когда сервер запускается, она проверяла, есть ли данные в базе.
//  Если нет, то запишет заранее подготовленные жанры в коллекцию.
writeDataGenre(); 

// Функция для получения всех жанров
// Мы создаем роут для получения всех жанров из базы данных. 
// Когда на адрес /api/genre приходит GET-запрос, вызывается функция getAllGenres, 
// которая, вероятно, возвращает все жанры из базы.
router.get('/api/genre', getAllGenres)


module.exports = router;