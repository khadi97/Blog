const express = require('express'); //Подключаем библиотеку express, которая используется для создания API.
const router = express.Router(); //Создаем объект router для обработки HTTP-запросов.
const writeDataCountry = require('./seed')
const {getAllCountries} = require('./controller')

router.get('/api/country', getAllCountries)

writeDataCountry()

module.exports = router;