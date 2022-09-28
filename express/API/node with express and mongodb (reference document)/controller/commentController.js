const blogModel = require( '../model/blogModel' );
const commentModel = require( '../model/commentModel' );

// create new comment
const newComment = async ( req, res ) => {
    try {
        // get the blog id
        const blogId = req.params.blogId
        // get the blog with the above id
        const blog = await blogModel.findById(blogId)
        // create a new comment
        const comm = new commentModel( req.body )
        // assign the comment to the blog
        comm.poster = blog;
        // save the comment
        comm.save();
        // add the comment to the comments array in the blog model
        blog.comments.push( comm )
        // save the blog
        await blog.save()
        // return a response
        res.status( 200 ).json( {
            status: 'success',
            data: comm
        } )
        // return a possible error message
    } catch ( e ) {
        res.status( 400 ).json( {
            status: 'fail',
            message: e.message
        })
    }
}

// get all the comments
const allComment = async ( req, res ) => {
    try {
        // get the blog id
        const blogId = req.params.blogId;
        // get the blog associated to this id
        const blog = await blogModel.findById( blogId ).populate('comments');
        // const blog = await blogModel.findById( blogId ).sort({createdAt: 1}).populate('comments');
        // const blog = await blogModel.findById( blogId ).populate({path: 'comments', select: 'msg'});
        // get the comments associated to this blog
        res.status( 200 ).json( {
            status: 'success',
            data: blog.comments
        } )
        // return possible error
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            data: error.message
        })
    }
}

// get single comment
const singleComment = async ( req, res ) => {
    try {
        // get the uri id
        const commentId = req.params.commId;
        // get the object
        const comm = await commentModel.findById( commentId );
        // return a response
        res.status( 200 ).json( {
            status: 'success',
            data: comm
        } )
        // return possible error
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// update a single comment
const updateComment = async ( req, res ) => {
    try {
        // grab the id from the endpoint(url)
        const commentId = req.params.blogId
        // get the object of the id 
        const comm = await commentModel.findById( commentId )
        // update the object
        const updatedComment = await commentModel.findByIdAndUpdate( comm, req.body, { new: true } )
        // throw a response
        res.status( 200 ).json( { 
            status: 'success',
            data: updatedComment
        } )
        // catch any possible error
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// remove a comment
const removeComment = async ( req, res ) => {
    try {
        // get the comment id
        let commentId = req.params.commId;
        // get the post id
        let blogId = req.params.blogId;
        // remove the comment from the comment database
        await commentModel.findByIdAndDelete( commentId )
        // get the actual post
        let blog = await blogModel.findById( blogId )
        // get the comment location from the blogModel
        await blog.comments.pull( commentId )
        // save the action
        blog.save();
        // return a response
        res.status( 200 ).json( { 
            status: 'success',
            message: 'deleted successfully'
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// remove all comment
const removeAllComment = async ( req, res ) => {
    try {
        // remove all data from the database
        await commentModel.deleteMany()
        // return a response
        res.status( 200 ).json( { 
            status: 'success',
            message: 'All Comments Was Deleted Successfully'
        } )
        // catch possible error
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

module.exports = {
    newComment,
    allComment,
    singleComment,
    updateComment,
    removeComment,
    removeAllComment,
}