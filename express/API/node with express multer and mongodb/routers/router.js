const express = require( 'express' )
const { createFuel, getAll, getOne, updateOne, deleteOne } = require( '../controllers/controller' )
const imageUploader = require( '../multer/multer')

const router = express.Router()
// METHOD ONE
// ROUTERS
// router.post( '/fuelStation', createFuel )
// router.get('/fuelStation', getAll)
// router.get('/fuelStation/:id', getOne)
// router.patch( '/fuelStation/:id', updateOne )
// router.delete( '/fuelStation/:id', deleteOne )


// METHOD TWO
// ROUTE WITHOUT ID
router
    .route( '/fuelStation' )
    .get( getAll )
    .post( imageUploader, createFuel )

// ROUTE WITH ID
router
    .route( '/fuelStation/:id' )
    .get( getOne )
    .patch( imageUploader, updateOne )
    .delete( deleteOne )

module.exports = router