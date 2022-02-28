const fs = require('fs');
const sampleModel = require( '../models/model' )


// POST
const createFuel = async ( req, res ) => {
    try {
        const fuelStation = await sampleModel.create( {
            name: req.body.name,
            location: req.body.location,
            createBy: req.body.createBy,
            image: req.file.path
        } )
        res.status( 201 ).json( {
            status: 'success',
            data: { 
                fuelStation
            }
        })
    } catch ( err ) {
        res.json( {
            message: err
        })
    }
}

// FIND ALL
const getAll = async ( req, res ) => {
    try {
        const fuelStations = await sampleModel.find();
        res.status( 200 ).json( {
            status: 'Success',
            data: {
                fuelStations
            }
        })
    } catch ( err ) {
        res.status( 204 ).json( {
            status: 'Fail',
            message: err.message
        })
    }
}

// get one
const getOne = async ( req, res ) => {
    // METHOD 1
    try{
        const id = req.params.id
        const fuelStation = await sampleModel.findById( id )
        if ( !fuelStation ) {
            res.status( 404 ).json( {
                status: 'Fail',
                message: `No fuel station with this id: ${id}`
            })
        }
        res.status( 200 ).json( {
            status: 'Success',
            data: { 
                fuelStation
            }
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'Fail',
            message: error.message
        })
    }
}

// updateOne

const updateOne = async ( req, res ) => {
    // METHOD 1
    try {
        const id = req.params.id
        if ( !id ) {
            res.status( 404 ).json( {
                status: 'fail',
                message: `Can not find fuel station with this id: ${id}`
            })
        }
        const updatedFuel = await sampleModel.findByIdAndUpdate( id, req.body, {
            new: true,
            runValidator: true
        } )
        res.status( 200 ).json( {
            status: "success",
                data: {
                    updatedFuel
            }
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'fail',
            message: error.message
        })
    }

    // METHOD 2
    // try {
    //     const id = req.params.id
    //     const fuelStation = await sampleModel.findById(id)
    //     if ( !fuelStation ) {
    //         res.status( 404 ).json( {
    //             status: 'fail',
    //             message: `Can not find fuel station with this id: ${id}`
    //         })
    //     }

    //     const updatedFuel = await fuelStation.updateOne( req.body, {new: true, runValidator: true} )
    //     res.status( 200 ).json( {
    //         status: "success",
    //             data: {
    //                 updatedFuel
    //         }
    //     })
    //     res.status( 200 ).json( {
    //         status: "success",
    //             data: {
    //                 updatedFuel
    //         }
    //     })
    // } catch ( error ) {
    //     res.status( 404 ).json( {
    //         status: 'fail',
    //         message: error.message
    //     })
    // }

}

// DELETE
const deleteOne = async ( req, res ) => {
    try {
        const id = req.params.id
        const deletedFuel = await sampleModel.findByIdAndDelete(id)
        res.status( 204 ).json( {
            status: "success",
            message: 'Deleted'
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'Fail',
            message: error.message
        })
    }
}
module.exports = {
    createFuel,
    getAll,
    getOne,
    updateOne,
    deleteOne
}