const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const commentSchema = new Schema( {
    name: { 
        type: String,
        required: true
    },
    msg: { 
        type: String,
        required: true
    },
    poster: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true } )

const commentModel = mongoose.model( 'comment', commentSchema )
module.exports = commentModel