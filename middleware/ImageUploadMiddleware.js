const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})


const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png|gif/

        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimeType = types.test(file.mimetype)
        if(mimeType && extName)
        {
            cb(null, true)
        }else
            cb(new Error("unsupported file"))
    }
})

module.exports = upload