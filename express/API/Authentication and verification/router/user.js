const express = require( 'express' )
const router = express.Router()
const {signUp, signIn, allUsers, testPage} = require('../controller/user')
const {isSignedIn} = require('../userAuthorization')


router
    .route( '/register' )
    .post( signUp )

router
    .route( '/login' )
    .post( signIn )

router
    .route( '/user' )
    .get( allUsers )

router
    .route( '/private', isSignedIn)
    .get(testPage)


module.exports = router;