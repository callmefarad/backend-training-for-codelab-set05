const codeLabModel = require( '../model/codelab' )
const {studentValidation} = require( '../validateStudent')


// create a student
const newStudent = async (req, res) => {
    try {
        const studentData = req.body
        // extract error from validation module
        const { error } = studentValidation( studentData )
        if ( error ) {
            res.status( 400 ).json( {
                message: error.details[0].message
            })
        }
        const student = await codeLabModel.create( studentData )
        res.status( 201 ).json( {
            status: "success",
            data: student
        })
    } catch ( error ) {
        res.status( 409 ).json( {
            status: 'Failed',
            message: error.message
        })
    }
}

// get all students
const allStudent = async ( req, res ) => {
    try {
        const students = await codeLabModel.find()
        const noStudent = students.length
        if ( students.length < 1 ) {
            res.status( 404 ).json( {
                status: 404,
                message: "No student was found.",
                studentSize: noStudent
            })
        }
        res.status( 200 ).json( {
            status: 'Success',
            data: students
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: 'Failed',
            message: 'error.message'
        })
    }
}

// get a student
const singleStudent = async ( req, res ) => {
    try {
        const student = await codeLabModel.findById( req.params.id )
        res.status( 200 ).json( {
            status: 'success',
            data: student
        })
    } catch ( error ) {
        res.status( 404 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}

// update a student 
const updateStudent = async ( req, res ) => {
    try {
        const studentData = req.body
        const { error } = studentValidation( studentData )
        if ( error ) {
            res.status(500).json( {
                message: error.details[0].message
            })
        }
        const updatedStudent = await codeLabModel.findByIdAndUpdate( req.params.id, studentData, { new: true } );
        res.status( 200 ).json( {
            status: 'success',
            data: updatedStudent
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}

// delete a student 
const deleteStudent = async ( req, res ) => {
    try {
        await codeLabModel.findByIdAndDelete( req.params.id );
        res.status( 200 ).json( {
            message: "deleted successfully"
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}


module.exports = {
    newStudent,
    allStudent,
    singleStudent,
    updateStudent,
    deleteStudent
}