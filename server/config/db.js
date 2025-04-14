const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog').then(() =>{ 
    console.log('Connected to MongoDB'); //если подключение успешное
}).catch((e) => {
    console.log('Failed to connect to MongoDB'); //если произошла ошибка
})