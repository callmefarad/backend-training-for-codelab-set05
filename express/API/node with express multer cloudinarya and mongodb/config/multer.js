const multer = require( 'multer' )
const path = require( 'path' )

const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
} )

const fileFilter = (req, file, cb) => {
    const extName = path.extname(file.originalname)
    if ( extName === '.png' || extName === '.jpg' || extName === '.jpeg' ) {
        cb(null, true)
    } else {
        cb(null, "Unsurported")
    }

}

const uploadImage = multer( {
    storage: storage,
    fileFilter: fileFilter,
    fileSize: {
        limits: 1024 * 1024 * 10
    }
} ).single( 'image' )

module.exports = uploadImage;

