const mongoose = require( 'mongoose' )


const userSchema = mongoose.Schema( {
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
} )

const userModel = mongoose.model( 'users', userSchema )
module.exports = userModel