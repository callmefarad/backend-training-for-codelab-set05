const express = require('express');
port = 2023
const students = require('./json_data/data.json')
const {writeToFile} = require('./utils/utils')



const app = express();
app.use(express.json());

// create an entry route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: "Welcome to CodeLab backend development session!!!"
    })
})

// read data from JSON file
app.get('/api/student', (req, res) => {
    try{
        if(students.length < 1){
            res.status(204).json({
                status: 'Fail',
                message: 'No available data',
                data: null
            })
        }else{
            // console.log(students)
            // send a response to the client containing all students
            res.status(200).json({
                status: 'Success',
                message: "All CodeLab Student", 
                data: {
                    students
                }
            })
        }
    }catch(error){
        console.log(error.message)
    }
})

// get a single student from the JSON data
app.get('/api/student/:id', (req, res) => {
    try{
        // get the id from the url
        const id = parseInt(req.params.id)
        // get the student with that id
        const student = students.find((std)=>std.id === id)
        // validate the id
        if(!id){
            res.status(404).json({
                status: 'Fail',
                message: `Student with id: ${id} does not exist`
            })
        } else{
            res.status(200).json({
                status: 'Success',
                message: `Student with id: ${id} was found`, 
                data: {
                    student
                }
            })
        }
    }catch(error){
        console.log(error.message)
    }
})

// add new student to the JSON data
app.post('/api/student', (req, res) => {
    try{
            // create a new student data
            const newStudent = {
                    id: students.length + 1,
                    name: req.body.name,
                    course: req.body.course,
                    duration: req.body.duration,
                    institution: req.body.institution,
                    grade:{
                        javascript: req.body.grade.javascript,
                        HTML: req.body.grade.HTML,    
                        CSS: req.body.grade.CSS,  
                        React: req.body.grade.React,
                        Node: req.body.grade.Node
                    }
                }
            // add the new student data to the JSON array
            students.push(newStudent)
            // update the JSON file
            writeToFile('./json_data/data.json', students)
            // send the response to client
            res.status(201).json({
                status: "Success", 
                data: {
                    newStudent
                }
            })
    }catch(error){
        console.log(error.message)
    }
})

// update a particular student
app.patch('/api/student/:id', (req, res)=>{
    try{
    // get the id from the url
    const id = parseInt(req.params.id)
    // get the student with that id
    const student = students.find((std)=>std.id === id)
    // validate the id
    if(!id){
        res.status(404).json({
            status: 'Fail',
            message: `Student with id: ${id} does not exist`
        })
    } else{
        // update the student data
        student.name = req.body.name,
        student.course = req.body.course,
        student.duration = req.body.duration,
        student.institution = req.body.institution,
        student.javascript = req.body.javascript,
        student.HTML = req.body.HTML,
        student.CSS = req.body.CSS,
        student.React = req.body.React,
        student.Node = req.body.Node

        // write the data to file
        writeToFile('./json_data/data.json', student)
        // send a response to the client
        res.status(200).json({
            status: "Success", 
            data: {
                student
            }
        })
    }
    }catch(error){
        console.log(error.message)
    }
})

// remove a student
app.delete('/api/student/:id', (req, res) => {
    try{
        // get the id passed to the url
        const id = parseInt(req.params.id);
        // get the obj of the id
        const student = students.find((std)=>std.id === id);
        // validate the id
        if(!student){
            res.status(404).json({
                status: 'fail',
                message: `No student with this id: ${id}`
            })
        }else{
            const index = students.indexOf(student);
            // remove the student on this index
            students.splice(index, 1)
            // write to file
            writeToFile(`${__dirname}/json_data/data.json`, students)
            res.status(204).json({
                status: 'Success',
                data: null
            })
        }
    }catch(error){
        console.log(error.message)
    }
})

app.listen(port, ()=> {
    console.log(`Server is listening to port: ${port}`);
})