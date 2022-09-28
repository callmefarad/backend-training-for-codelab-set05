const express = require( 'express' );
const router = express.Router();
const { newComment, allComment, singleComment, updateComment, removeComment, removeAllComment } = require('../controller/blogController');

//  routes for blog endpoints
router
    .route( '/blog/:blogId/comment' )
    .get(allComment) // Get all comment
    .post( newComment ) // Post new comment
    .delete(removeAllComment) // delete all comment

router
    .route( '/blog/:blogId/comment/:commId' )
    .get( singleComment ) // Get a comment
    .patch( updateComment ) // Update a comment
    .delete( removeComment ) // Delete a comment

// expose this module
module.exports = router;