const jwt = require( 'jsonwebtoken' )
const expressJwt = require( 'express-jwt' )
const bcrypt = require( 'bcrypt' )
const userModel = require( '../model/user' )
const {validateRegistration, validateLogin} = require( '../validateStudent')


// create signup
const signUp = async ( req, res ) => {
    try {
        // validate user
        // extract error from the request body
        const { error } = validateRegistration( req.body )
        if ( error ) {
            res.status(401).json({message: error.details[0].message})
        } else {
            // track user with email
            const checkUser = await userModel.findOne( { email: req.body.email } )
            if ( checkUser ) {
                res.status( 400 ).json( {
                    message: `${checkUser.email} already exist`
                })
            } else {
                // salt the password
                const saltedPassword = await bcrypt.genSalt( 10 )
                // hash the salted password
                const hashedPassword = await bcrypt.hash( req.body.password, saltedPassword )
                // create a user object
                const data = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPassword,
                }

                // create user
                const user = await userModel.create( data )
                res.status( 200 ).json( {
                    data: user
                })
            }
        }      
    } catch ( error ) {
        res.status( 401 ).json( {
            message: error.message
        })
    }
}

// create login
const signIn = async ( req, res ) => {
    try {
        // validate the user
        const { error } = validateLogin( req.body )
        if ( error ) {
            res.status( 400 ).json( {
                message: error.message
            })
        } else {
            // verify the user
            const user = await userModel.findOne( { email: req.body.email } )
            if ( !user ) {
                res.json({
                    message: `No user with this email: ${req.body.email}`
                })
            } else {
                // compare the password
                const passwordCheck = await bcrypt.compare( req.body.password, user.password )
                if ( !passwordCheck ) {
                    res.json({ message: 'Incorrect password'})
                } else {
                    // authenticate the user with a token
                    const token = jwt.sign(
                        {_id: userModel._id, email: userModel.email},
                        "mytoken",
                        {expiresIn: "2d"}
                    )
                    // send a response
                res.status( 500 ).json( {
                    status: 'success',
                    data: token
                })
                }   
            }
        }
    } catch ( error ) {
        res.json({ message: error.message})
    }
}

// authorize user for CRUD operation
// const isSignedIn = expressJwt( {
//     secret: 'mytoken',
//     userProperty: "auth",
//     algorithms: [ 'HS256' ],
// } );

// testing page
const testPage = async ( req, res ) => {
    try {
         // get the token from the header
        const authToken = req.headers.authorization
        console.log(authToken)
        if ( !authToken ) {
            res.json({ message: "Not authorized because you don't have a token"})
        } else {
            // authorize the user
            const token = authToken.split( " " )[ 1 ]
            // verify the token
            if ( token ) {
                jwt.verify( token, 'mytoken', ( error ) => {
                    if ( error ) {
                        res.json({message: error.message})
                    } else {
                        res.json({message: "You have been authenticated verified"})
                    }
                })
            } else {
                res.json({message: 'your token did not match'})
            }
        }
        // res.json({message: "You have been authenticated verified"})
    } catch ( error ) {
        res.json({ message: error.message })
    }
}


module.exports = {
    signUp,
    signIn,
    testPage,
    // isSignedIn
}