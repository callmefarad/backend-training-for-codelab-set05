const express = require( 'express' );
const { route } = require( 'express/lib/application' );
const router = express.Router();
const { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require( '../controller/controller' )
const uploadImage = require('../config/multer')

router.post( '/blog', uploadImage, createBlog )
router.get( '/blog', getAllBlogs )
router.get( '/blog/:id', getBlog )
router.patch( '/blog/:id', uploadImage,  updateBlog )
router.delete( '/blog/:id', deleteBlog )


// router.route( '/blog' )
//     .post(uploadImage, createBlog )
//     .get( getAllBlogs )
    
// router.route( '/blog/:id' )
//     .get( getBlog )
//     .patch(uploadImage, updateBlog )
//     .delete( deleteBlog )

module.exports = router;