const express = require( 'express' );
const router = express.Router();
const { getAllBlog, newBlog, updateBlog, removeBlog, deleteAll, newComment, allComment, singleBlog, singleComment, updateComment, removeComment, removeAllComment } = require('../controller/blogController');



// route for endpoints
router
    .route( '/blog' )
    .get( getAllBlog )
    .post( newBlog )
    .delete( deleteAll )

router
    .route( '/blog/:id' )
    .get( singleBlog )
    .patch( updateBlog )
    .delete( removeBlog )
    
router
    .route( '/blog/:id/comment' )
    .get(allComment)
    .post( newComment )
    .delete(removeAllComment)

router
    .route( '/blog/:id/comment/:id' )
    .get( singleComment )
    .patch( updateComment )
    .delete( removeComment )

// expose this module
module.exports = router