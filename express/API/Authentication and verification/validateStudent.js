// import the validator library
const hapiJoy = require( '@hapi/joi' ) 

// create a validator function for student
const validateStudent = (data) => {
    const validateMe = hapiJoy.object( {
        name: hapiJoy.string().min(3).max(20),
        institution: hapiJoy.string(),
        course: hapiJoy.string(),
        married: hapiJoy.boolean()
    } )
    return validateMe.validate(data)
}
module.exports.validateStudent = validateStudent;


// create a validator function for registration
const validateRegistration = (data) => {
    const validateMe = hapiJoy.object( {
        fullName: hapiJoy.string(),
        email: hapiJoy.string().email(),
        password: hapiJoy.string()
    } )
    return validateMe.validate(data)
}

module.exports.validateRegistration = validateRegistration;

// create a validator function for login
const validateLogin = (data) => {
    const validateMe = hapiJoy.object( {
        fullName: hapiJoy.string(),
        email: hapiJoy.string().email(),
        password: hapiJoy.string()
    } )
    return validateMe.validate(data)
}

module.exports.validateLogin = validateLogin;

