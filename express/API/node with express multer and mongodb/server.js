const express = require( 'express' )
const mongoose = require( 'mongoose' )
const allRoutes = require( './routers/router' )
port = 2020

// const url = 'mongodb://127.0.0.1/fuelDB'
const url = 'mongodb+srv://callmefarad:B577f2Ai8bh6txuT@blog.eenxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect( url ).then( () => {
    console.log('Connect to the database')
} ).catch( ( err ) => {
    console.log(err)
})
const app = express()
app.use( express.json() )
app.use('/fuel-images', express.static('./uploads'))
app.use('/api/v1', allRoutes)

app.listen( port, () => {
    console.log( 'listening on port: ' + port )
})