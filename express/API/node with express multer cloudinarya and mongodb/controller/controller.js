const blogModel = require( '../model/model' )
const cloudinary = require( '../config/cloudinary' )
const fs = require('fs')

// create a blog
const createBlog = async ( req, res ) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const blog = await blogModel.create( {
            title: req.body.title,
            desc: req.body.desc,
            image: req.file.path,
            cloud_url: result.secure_url,
            cloud_id: result.public_id
        } )
        console.log(result)
        res.status( 201 ).json( {
            data: blog
        })
    } catch(error){
        console.log(error.message)
    }
}

// get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blog = await blogModel.find();
        if ( blog.length <= 0 ) {
            res.status( 404 ).json( {
                status: 'failed',
                message: 'No content found'
            })
        }
        res.status( 200 ).json( {
            data: blog
        } )
    } catch(error){
        console.log(error.message)
    }
}
// get a blog
const getBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await blogModel.findById( id );
        if ( !blog ) {
            res.status( 404 ).json( {
                status: 'failed',
                message: `No such id: ${id} found`
            })
        }
        res.status( 200 ).json( {
            data: blog
        })
    } catch(error){
        console.log(error.message)
    }
}
// update a blog
const updateBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await blogModel.findById( id );
        await cloudinary.uploader.destroy( blog.cloud_id )
        await fs.unlinkSync( blog.image )
        
        await cloudinary.uploader.upload( blog )
        const data = {
            title: req.body.title,
            desc: req.body.desc,
            image: req.file.path,
            cloud_url: result.secure_url,
            cloud_id: result.public_id
        }
        const updatedBlog = await blogModel.findByIdAndUpdate(id, data, {new: true});
        res.status( 200 ).json( {
            data: updatedBlog
        })
    } catch(error){
        console.log(error.message)
    }
}
// delete a blog
const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await blogModel.findById( id )
        await cloudinary.uploader.destroy( blog.cloud_id )
        await fs.unlinkSync(blog.image)
        await blogModel.findByIdAndDelete(id);
        res.status( 204 ).json( {
            status: 'deleted'
        })
    } catch(error){
        console.log(error.message)
    }
}



module.exports = {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}