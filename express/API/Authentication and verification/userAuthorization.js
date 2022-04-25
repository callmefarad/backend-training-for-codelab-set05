// const jwt = require('jsonwebtoken');

// // authorize user for CRUD operation
// // const isSignedIn = expressJwt( {
// //     secret: 'mytoken',
// //     userProperty: "auth",
// //     algorithms: [ 'HS256' ],
// // } );


// // module.exports = isSignedIn;

// const isSignedIn = async ( req, res, next ) => {
//     try {
//         // get the token from the header
//         const authToken = req.header.authorization
//         if ( !authToken ) {
//             res.json({ message: "Not authorized because you don't have a token"})
//         } else {
//             // authorize the user
//             const token = authToken.split( " " )[ 1 ]
//             // verify the token
//             if ( token ) {
//                 jwt.verify( token, 'mytoken', ( error, payload ) => {
//                     if ( error ) {
//                         res.json({message: error.message})
//                     } else {
//                         res.user = payload
//                         next()
//                     }
//                 })
//             } else {
//                 res.json({message: 'your token did not match'})
//             }
//         }
//     } catch ( error ) {
//         res.json({message: error.message})
//     }
// }

// module.exports = isSignedIn