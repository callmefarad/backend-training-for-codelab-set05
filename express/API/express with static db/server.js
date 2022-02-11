const express = require('express')
const port = 2023


const app = express()
app.use(express.json())

// create a JavaScript array of object (to be used as dummy database)
const studentInfo = [
    {
    id: 1,
    name: "Toheeb",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 80,
        CSS: 50,
        React: 50,
        Node: 40,
    }
},
    {
    id: 2,
    name: "Nelson",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 70,
        HTML: 60,
        CSS: 50,
        React: 50,
        Node: 70,
    }
},
    {
    id: 3,
    name: "Micheal",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 80,
        CSS: 40,
        React: 50,
        Node: 40,
    }
},
    {
    id: 4,
    name: "Clinton",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 50,
        CSS: 50,
        React: 50,
        Node: 40,
    }
},
    {
    id: 5,
    name: "Idris",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 80,
        CSS: 50,
        React: 50,
        Node: 90,
    }
},
    {
    id: 6,
    name: "Precious",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 80,
        CSS: 50,
        React: 80,
        Node: 40,
    }
},
    {
    id: 7,
    name: "Luciana",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 80,
        CSS: 70,
        React: 50,
        Node: 40,
    }
},
    {
    id: 8,
    name: "Cynthia",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 40,
        HTML: 90,
        CSS: 50,
        React: 50,
        Node: 40,
    }
},
    {
    id: 9,
    name: "Leke",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 80,
        CSS: 50,
        React: 50,
        Node: 90,
    }
},
    {
    id: 10,
    name: "Dickson",
    course: "Full Stack",
    duration: "One Year",
    institution: "CodeLab",
    grade:{
        javascript: 60,
        HTML: 90,
        CSS: 50,
        React: 50,
        Node: 40,
    }
}
]

// all request goes here
// Welcome message
app.get('/', (req, res)=>{
    // return a response to the client
    res.json({message: "Welcome to EXPRESS API WITH DUMMY DATA"})
})

// get all students
app.get('/studentInfo', (req, res)=>{
    try{
        // check if there is content in the array
        if(studentInfo.length < 1){
            // return an error message
            res.json({message: "No content in the database"})
        }else{
            // get all the students in that array and send a response to the client
            res.status(200).json({message: "All student of CodeLab", data: studentInfo})
        }
    }catch(error){
        console.log(error.message)
    }
})

// get a single student
app.get('/studentInfo/:id', (req, res) => {
    try{
        // get the id
        const id = parseInt(req.params.id)
        // get the object of the id
        const student = studentInfo.find((stud)=>stud.id === id)
        // validate the id
        if(!id){
            // throw an error message
            res.json({message: `This id: ${req.params.id} does not exist`})
        }else{
            // return a response to the client
            res.status(200).json({message: `Student with id: ${req.params.id} was found`, data: student})
        }
    }catch(error){
        console.log(error.message)
    }
})

// create/add a student
app.post('/studentInfo', (req, res) => {
    try{
        // create a new object
        const newStudent = {
            id: studentInfo.length + 1,
            duration: req.body.duration,
            course: req.body.course,
            duration: req.body.duration,
            institution: req.body.institution,
            grade: {
                javascript: req.body.grade.javascript,
                HTML: req.body.grade.HTML,
                CSS: req.body.grade.CSS,
                React: req.body.grade.React,
                Node: req.body.grade.Node
            }
        }

        // add the new object to the array
        studentInfo.push(newStudent)
        // send a response to the client
        res.status(200).json({message: "Student Created Successfully", data: newStudent})
    }catch(error){
        console.log(error.message)
        res.json({message: error.message})
    }
})

// update a student
app.patch('/studentInfo/:id', (req, res) => {
    try{
        // get the id passed to the url
        const id = parseInt(req.params.id)
        // get the object of the id
        const studentId = studentInfo.find((student)=>student.id === id)
        // update the fields of the student with the id found in the array
        studentId.name = req.body.name,
        studentId.course = req.body.course,
        studentId.duration = req.body.duration,
        studentId.institution = req.body.institution,
        studentId.javascript = req.body.javascript,
        studentId.HTML = req.body.duration,
        studentId.CSS = req.body.duration,
        studentId.React = req.body.duration,
        studentId.Node = req.body.duration

        // return the updated object to the client
        res.status(200).json({message: "Updated Successfully", data: studentId})
    }catch(error){
        console.log(error.message)
    }
})

// delete a student
app.delete('/studentInfo/:id', (req, res) => {
    try{
        // get the id 
        const id = parseInt(req.params.id)
        // get the object of the id passed to the url
        const studentId = studentInfo.find((student)=>student.id === id)
        // validate the id
        if(!id){
            res.json({message: `Invalid id : ${req.params.id}`})
        }else{
            // get the index of the id
            const index = studentInfo.indexOf(studentId)
            // remove the object of the index found
            studentInfo.splice(index, 1)
            // return a  response to the client
            res.status(200).json({message: `Student with id: ${req.params.id} was deleted successfully`})
        }
    }catch(error){
        console.log(error.message)
    }
})


// all request ends here
app.listen(port, ()=>{
    console.log(`Server is listening to ${port}`)
})