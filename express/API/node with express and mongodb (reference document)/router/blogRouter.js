const express = require( 'express' );
const router = express.Router();
const { getAllBlog, newBlog, updateBlog, removeBlog, deleteAll, singleBlog} = require('../controller/blogController');



// routes for blog endpoints
router
    .route( '/blog' ) // universal route
    .get( getAllBlog ) // Get all blog
    .post( newBlog ) // Post a blog
    .delete( deleteAll ) // Delete a blog

router
    .route( '/blog/:blogId' ) // universal route
    .get( singleBlog ) // Get a blog
    .patch( updateBlog ) // Update a blog
    .delete( removeBlog ) // Delete a blog
    

// expose this module
module.exports = router