const mongoose = require( 'mongoose' )
port = 5000;
url= 'mongodb://localhost:27017/blogDB'
mongoose.connect( url ).then( () => {
    console.log("database connected successfully")
} ).catch( ( e ) => {
    console.log(e.message)
} )