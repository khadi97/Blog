const Blog = require('./Blog')
const fs = require('fs')
const path = require('path')

const createBlog = async(req, res) => {
    console.log('Request body:', req.body); // Выводим тело запроса для отладки

    // Проверка на наличие данных
    if (
        req.file &&
        req.body.title && req.body.title.length > 2 &&
        req.body.category && req.body.category.length > 2 &&
        req.body.description && req.body.description.length > 2
    ) {
        try {
            const newBlog = new Blog({
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                image: `/images/items/${req.file.filename}`,
                author: req.user._id
            });

            // Сохраняем блог в базе данных
            await newBlog.save();

            res.redirect(`/my_blogs/${req.user._id}`);
        } catch (error) {
            console.error("Error saving blog:", error);
            res.redirect('/new?error=2');  // Переадресация с ошибкой
        }
    } else {
        res.redirect('/new?error=1');
    }
};


const editBlog = async(req, res) => {
     if(req.file &&
        req.body.title.length > 2 &&
        req.body.category.length > 0 &&
        req.body.description.length > 2)
        {
            const blog = await Blog.findById(req.body.id)
            fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
            await Blog.findByIdAndUpdate(req.body.id, {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                image: `/images/items/${req.file.filename}`,
                author: req.user._id
            })
            res.redirect('/my_blogs/' + req.user._id)
        } else {
            res.redirect(`/edit_blogs/${req.body.id}?error=1`)
        }
}


module.exports = { createBlog, editBlog };