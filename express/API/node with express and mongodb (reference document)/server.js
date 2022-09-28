require( './config/db' )
const express = require( 'express' )
const blogRouter = require( "./router/blogRouter" )
const commentRouter = require( "./router/commentRouter" )


const app = express()
app.use( express.json() )
app.get( '/', ( req, res ) => {
    res.send("Welcome to our blog")
} )
app.use( '/api', blogRouter );
app.use( '/api', commentRouter );

app.listen( port, () => {
    console.log("Server is listening to port " + port)
} )