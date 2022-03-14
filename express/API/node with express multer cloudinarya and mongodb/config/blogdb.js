require( 'dotenv' ).config();
const mongoose = require( 'mongoose' )

// url = process.env.LOCAL_DB
url = process.env.MONGODB_URI
mongoose.connect( url )
    .then( () => {
        console.log( 'Database connection established' )
    } ).catch( ( err ) => {
        console.log( err.message)
    })