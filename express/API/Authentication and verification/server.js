require( './config/db' )
const express = require( 'express' )
const port = 1010
const codelabRouter = require( './router/codelab' )
const userRouter = require( './router/user' )

const app = express()
app.use( express.json() )
app.get( '/', (req, res) => {
    res.send('Welcome')
} )
app.use("/api", codelabRouter)
app.use("/api", userRouter)

app.listen( port, () => {
    console.log( 'listening on port ' + port)
})