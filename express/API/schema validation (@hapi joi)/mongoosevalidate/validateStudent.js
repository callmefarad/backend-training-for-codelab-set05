// import the validator library (hapi/joi)
const joi = require( '@hapi/joi' )

// validation function
const studentValidation = ( studentData ) => {
    // pass the validated field to a variable
    const validatedField = joi.object( {
        name: joi.string().required().min( 3 ),
        institution: joi.string().required(),
        course: joi.string().required()
    } )
    return validatedField.validate(studentData)
}

module.exports.studentValidation = studentValidation