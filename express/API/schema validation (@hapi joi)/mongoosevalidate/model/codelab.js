const mongoose = require( 'mongoose' );


const codeLabSchema = mongoose.Schema( {
    name: {
        type: String
    },
    institution: {
        type: String
    },
    course: {
        type: String
    }
}, {timestamps: true} );

const codeLabModel = mongoose.model( 'students', codeLabSchema )

module.exports = codeLabModel;