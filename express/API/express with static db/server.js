const express = require('express')
const port = 2023


const app = express()

// create a JavaScript array of object that stands as our database
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
    res.json({message: "Welcome to EXPRESS API"})
})

// get all students
app.get('/studentInfo', (req, res)=>{
    try{
        // check if there is content in the database
        if(studentInfo.length < 1){
            res.json({message: "No content in the database"})
        }else{
            // get all the students in that database
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
        const id = req.params.id
        if(!id){
            res.json({message: `This id: ${req.params.id} does not exist`})
        }else{
            const student = studentInfo.find((stud)=>stud.id === id)
            res.status(200).json({message: `Student with id: ${req.params.id} was found`, data: student})
        }
    }catch(error){
        console.log(error.message)
    }
})

// create/add a student

// update a student

// delete a student


// all request ends here
app.listen(port, ()=>{
    console.log(`Server is listening to ${port}`)
})