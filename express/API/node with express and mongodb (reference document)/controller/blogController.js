const blogModel = require( '../model/blogModel' )
const commentModel = require('../model/commentModel')

// get all blogs
const getAllBlog = async (req, res) => {
    try {
        // get all the documents in the databse
        const blogs = await blogModel.find();
        // return a response
        res.status( 200 ).json( {
            status: "success",
            data: blogs
        } );
        // return any available error 
    } catch(error) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        } );
    }
}

// create blog
const newBlog = async ( req, res ) => {
    try {
        // defining the needed data 
        const data = {
            title: req.body.title,
            content: req.body.content

        }
        // create a new blog
        const blog = await blogModel.create( data )
        // return a response
        res.status( 201 ).json( {
            status: 'success',
            data: blog
        } )
        // return any possible error
    } catch ( e ) {
        res.status( 400 ).json( {
            status: "fail",
            message: e.message
        })
    }
}

// get a blog
const singleBlog = async ( req, res ) => {
    try {
        // grab the id
        const blogId = req.params.blogId
        // get tht object of the id
        const blog = await blogModel.findById( blogId )
        // get the response
        res.status( 200 ).json( {
            status: "success",
            data: blog
        } )
        // get the possible error
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// update a blog
const updateBlog = async ( req, res ) => {
    try {
        // grab the id from the uir
        const blogId = req.params.blogId;
        // get the object
        const blog = await blogModel.findById( blogId );
        // get the content of the body
        const data = req.body
        // update the selected blog
        const updatedBlog = await blogModel.findByIdAndUpdate( blog, data, { new: true } )
        // return a response
        res.status( 200 ).json( {
            status: 'success',
            data: updatedBlog
        } )
        // return any possible error
    } catch ( error ) {
        res.status( 500 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// delete a blog
const removeBlog = async ( req, res ) => {
    try {
        // get the id from the parameter
        const blogId = req.params.blogId
        // remove the document
        await blogModel.findByIdAndRemove( blogId )
        // return a response
        res.status( 200 ).json( { 
            status: 'success',
            message: 'deleted successfully'
        } )
        // return any possible error
    } catch ( error ) {
        res.status( 200 ).json( {
            status: 'fail',
            message: error.message
        })
    }
}

// remove all blogs
const deleteAll = async ( req, res ) => {
    try {
        const allBlogs = await blogModel.deleteMany()
        // return response
        res.status( 200 ).json( {
            status: "success",
            message: 'deleted successfully'
        } )
        // return any possible error
    } catch ( e ) {
        res.status( 400 ).json( {
            status: 'fail',
            message: e.message
        })
    }
}



// controllers for comment.
// create a comment
const newComment = async ( req, res ) => {
    try {
        // get the blog id
        const blogId = req.params.blogId
        // get the blog with this id
        const blog = await blogModel.findById(blogId)
        // create a new comment
        const comm = new commentModel( req.body )
        // assign the new comment to the associated blog
        comm.poster = blog;
        // save the comment
        comm.save();
        // add the comment to the blog comments array
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
        // get the blogo id
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
    getAllBlog,
    newBlog,
    singleBlog,
    updateBlog,
    removeBlog,
    deleteAll,
    newComment,
    allComment,
    singleComment,
    updateComment,
    removeComment,
    removeAllComment
}