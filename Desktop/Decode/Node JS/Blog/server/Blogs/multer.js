const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/items')
    },
    filename: function(req, file, cb){
        //myimage.jpeg
        let ext = file.originalname.split('.')
        ext = ext[ext.length - 1]
        ///dfg345654.jpeg
        const unique = Date.now() + '.' + ext
        cb(null, unique)
    }
})

const upload = multer({ storage })

module.exports = { upload }