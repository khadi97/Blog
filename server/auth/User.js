const mongoose = require('mongoose')

//Создаем новую схему 
const UserSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    password: String
})


// Экспортируем новую модель user и отправляем туда нащу схему UserSchema
module.exports = mongoose.model('user', UserSchema)