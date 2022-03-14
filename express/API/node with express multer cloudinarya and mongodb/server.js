require('./config/blogdb')
const express = require( 'express' )
const { use } = require( 'express/lib/application' )
const port = process.env.PORT || 9000
const blogRoute = require( './router/router')

const app = express()
app.use( express.json() )

app.get( '/', ( req, res ) => {
    res.send('Welcome to my blog API')
} )
app.use('/api', blogRoute)
app.listen( port, () => {
    console.log("Server is listening to port" + port)
})