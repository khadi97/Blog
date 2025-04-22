const Blog = require('./Blog')
const fs = require('fs')
const path = require('path')

const createBlog = async(req, res) => {
    console.log('Request body:', req.body); //Выводим тело запроса для отладки

    //Проверка на наличие данных
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

            //Сохраняем блог в базе данных
            await newBlog.save();

            res.redirect(`/my_blogs/${req.user._id}`);
        } catch (error) {
            console.error("Error saving blog:", error);
            res.redirect('/new_blogs?error=2');  // Переадресация с ошибкой
        }
    } else {
        res.redirect('/new_blogs?error=1');
    }
};


const editBlog = async (req, res) => {
    try {
        const { id, title, category, description } = req.body;

        //Проверка валидности входных данных
        if (!title || title.length < 3 ||
            !category || category.length < 1 ||
            !description || description.length < 3) {
            return res.redirect(`/edit_blogs/${id}?error=1`);
        }

        //Находим блог
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.redirect(`/edit_blogs/${id}?error=notfound`);
        }

        //Данные для обновления
        const updatedData = {
            title,
            category,
            description,
            author: req.user._id // не обязательно, но если нужно обновить
        };

        //Если загружено новое изображение — заменяем
        if (req.file) {
            const oldImagePath = path.join(__dirname, '../../public', blog.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            updatedData.image = `/images/items/${req.file.filename}`
        }

        //Обновляем блог
        await Blog.findByIdAndUpdate(id, updatedData);
        res.redirect(`/my_blogs/${req.user._id}`)
    } catch (error) {
        console.error('Ошибка при редактировании блога:', error)
        res.redirect(`/edit_blogs/${req.body.id}?error=2`)
    }
}


const deleteBlog = async(req, res) => {
    //находим блог, он существует или нет
    const blog = await Blog.findById(req.params.id)
    if(blog){// если все успешно
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        //команда удаления
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    } else {
        res.status(404).send('Not found')
    }
}


module.exports = { createBlog, editBlog, deleteBlog};