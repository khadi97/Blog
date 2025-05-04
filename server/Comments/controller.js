const Comment = require('./Comments');
const Blog = require('../Blogs/Blog');

const saveComment = async (req, res) => {
    try {
        const { authorId, blogId, text } = req.body;

        if (authorId && blogId) {
            await new Comment({
                text,
                authorId,
                blogId,
                date: Date.now()
            }).save();

            await Blog.findByIdAndUpdate(blogId, {
                $inc: { commentCount: 1 }
            });
        }

        res.status(200).send(true);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка при сохранении комментария');
    }
};



module.exports = {
    saveComment
};