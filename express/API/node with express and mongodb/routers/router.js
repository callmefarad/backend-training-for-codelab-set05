const express = require( 'express' )
const { createFuel, getAll, getOne, updateOne, deleteOne } = require( '../controllers/controller')

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
    .post( createFuel )

// ROUTE WITH ID
router
    .route( '/fuelStation/:id' )
    .get( getOne )
    .patch( updateOne )
    .delete( deleteOne )

module.exports = router