const express = require( 'express' )
const mongoose = require( 'mongoose' )
const allRoutes = require( './routers/router' )
port = 2021

const url = 'mongodb://127.0.0.1/sampleDB'
mongoose.connect( url ).then( () => {
    console.log('Connect to the database')
} ).catch( ( err ) => {
    console.log(err)
})
const app = express()
app.use(express.json())

app.use('/api/v1', allRoutes)

app.listen( port, () => {
    console.log( 'listening on port: ' + port )
})