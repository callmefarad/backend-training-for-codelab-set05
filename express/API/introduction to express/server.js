// import express framework
const express = require('express')
// initialize a port
const PORT = 2023

// create an instance of express
const app = express()
app.use(express.json())

// create a JavaScript
const studentInfo ={
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
}

// entry route
// REQUEST: GET localhost:2023/
app.get('/', (req, res) =>{
    // res.json({message: 'Welcome to ExpressJS'})
    // passing a responds with status code
    res.status(200).json({message: 'Welcome to ExpressJS'})
})

app.listen(PORT, ()=>{
    console.log(`Server is listening to port: ${PORT}`)
})



