const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function (req, file, cb) {
        var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null,file.originalname+"-"+ Date.now() + extension);
    }
})
exports.upload = multer({ storage: storage }).array('imagenes', 10)

