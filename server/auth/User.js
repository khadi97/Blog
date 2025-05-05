const mongoose = require('mongoose')

//Создаем новую схему 
const UserSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    password: String,
    bio: { type: String, default: '' },
    googleId: String,
    githubId: String

})


// Экспортируем новую модель user и отправляем туда нащу схему UserSchema
module.exports = mongoose.model('user', UserSchema)