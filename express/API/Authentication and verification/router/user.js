const express = require( 'express' )
const router = express.Router()
const {signUp, signIn, testPage} = require('../controller/user')
// const {isSignedIn} = require('../userAuthorization')


router
    .route( '/register' )
    .post( signUp )

router
    .route( '/login' )
    .post( signIn )

router
    .route( '/private' )
    .get(testPage)


module.exports = router;