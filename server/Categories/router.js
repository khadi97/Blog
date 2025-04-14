const express = require('express'); //Подключаем библиотеку express, которая используется для создания API.
const router = express.Router(); //Создаем объект router для обработки HTTP-запросов.
const { getAllCategories } = require('./controller'); // Импортируем функцию для получения категорий
const writeDataCategory = require('./seed') // Импортируем функцию для добавления категорий

writeDataCategory(); 

router.get('/api/category', getAllCategories)

module.exports = router;
