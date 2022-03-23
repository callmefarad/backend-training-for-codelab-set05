const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema;


const blogSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [ {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
},{ timestamps: true } )


const blogModel = mongoose.model( 'user', blogSchema );
module.exports = blogModel;