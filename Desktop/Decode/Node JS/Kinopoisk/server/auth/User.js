const mongoose = require('mongoose')

//Создаем новую схему 
const UserSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean
})


// Экспортируем новую модель user и отправляем туда нащу схему UserSchema
module.exports = mongoose.model('user', UserSchema)