const mongoose = require( 'mongoose' );


const codeLabSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    institution: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    married: {
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

const codeLabModel = mongoose.model( 'students', codeLabSchema )

module.exports = codeLabModel;