const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new mongoose.Schema({
    title: String, 
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    description: String,
    image: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    commentCount: { type: Number, default: 0 },  // Добавим для подсчёта комментариев
    viewCount: { type: Number, default: 0 },     // поле для количества просмотров
    },
    {
        timestamps: true // <-- должно быть здесь, во втором аргументе!
    },
    
    
)

module.exports = mongoose.model('blog', BlogSchema)