const express = require( 'express' );
const router = express.Router()
const {
    newStudent,
    allStudent,
    singleStudent,
    updateStudent,
    deleteStudent} = require( '../controller/codelab')


router
    .route( "/student" )
    .post(newStudent)
    .get(allStudent)

router
    .route( "/student/:id" )
    .get(singleStudent)
    .patch(updateStudent)
    .delete( deleteStudent )
    

module.exports = router;