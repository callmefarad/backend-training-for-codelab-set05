const mongoose = require( 'mongoose' )

const blogSchema = mongoose.Schema( {
    title: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    cloud_url: {
        type: String,
    },
    cloud_id: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date()
    }
} )

const blogModel = mongoose.model( 'blogCollection', blogSchema )

module.exports = blogModel;