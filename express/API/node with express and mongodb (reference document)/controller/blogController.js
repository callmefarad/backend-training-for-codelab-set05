const blogModel = require( '../model/blogModel' )
const commentModel = require('../model/commentModel')

// get all blogs
const getAllBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status( 200 ).json( {
            status: "success",
            data: blogs
        } );
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
        const data = {
            title: req.body.title,
            content: req.body.content

        }
        const blog = await blogModel.create( data )
        res.status( 201 ).json( {
            status: 'success',
            data: blog
        })
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
        const blogId = req.params.id
        const blog = await blogModel.findById( blogId )
        res.status( 200 ).json( {
            status: "success",
            data: blog
        })
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
        const blogId = req.params.id;
        const blog = await blogModel.findById( blogId );
        const data = req.body
        const updatedBlog = await blogModel.findByIdAndUpdate( blog, data, { new: true } )
        res.status( 200 ).json( {
            status: 'success',
            data: updatedBlog
        })
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
        const blogId = req.params.id
        // remove the document
        await blogModel.findByIdAndRemove( blogId )
        res.status( 200 ).json( { 
            status: 'success',
            message: 'deleted successfully'
        })
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
        res.status( 200 ).json( {
            status: "success",
            message: 'deleted successfully'
        })
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
        const blogId = req.params.id
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
        res.status( 200 ).json( {
            status: 'success',
            data: comm
        } )

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
        const blogId = req.params.id;
        // get the blog associated to this id
        const blog = await blogModel.findById( blogId ).populate('comments');
        // get the comments associated to this blog
        res.status( 200 ).json( {
            status: 'success',
            data: blog.comments
        })
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
        const commentId = req.params.id;
        const comm = await commentModel.findById( commentId );
        res.status( 200 ).json( {
            status: 'success',
            data: comm
        })

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
        const commentId = req.params.id
        const comm = await commentModel.findById( commentId )
        const updatedComment = await commentModel.findByIdAndUpdate( comm, req.body, { new: true } )
        res.status( 200 ).json( { 
            status: 'success',
            data: updatedComment
        })
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
        const commentId = req.params.id
        await commentModel.findByIdAndRemove( commentId )
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
        await commentModel.deleteMany()
        res.status( 200 ).json( { 
            status: 'success',
            message: 'All Comments Was Deleted Successfully'
        })
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
    removeComment
}