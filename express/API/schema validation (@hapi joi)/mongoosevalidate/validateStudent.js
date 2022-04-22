// import the validator library
const hapiJoy = require( '@hapi/joi' ) 

// create a validator function
const validateUser = (data) => {
    const validateMe = hapiJoy.object( {
        name: hapiJoy.string().min(3).max(20),
        institution: hapiJoy.string(),
        course: hapiJoy.string(),
        married: hapiJoy.boolean()
    } )
    return validateMe.validate(data)
}
module.exports.validateUser = validateUser;