// creating an instance of http module
const http = require('http');
// creating a port for our server
const port = 2021;

let student = [
    {name: "toheeb", stack: "fullstack"},
    {name: "Precious", stack: "fullstack"},
    {name: "blessing", stack: "frontend"},
    {name: "cynthia", stack: "backend"}
]

// create a request function
const testFunction = (req, res)=>{
    res.setHeader("Content-Type", "application/json");
    res.write("\n")
    res.end(JSON.stringify(student));
}

// create a server
const app = http.createServer(testFunction);

// connect our server to the port
app.listen(port, ()=>{
    console.log("Server is listening to port " + port)
})

// this converts a JSON object to a javascript object
// JSON.parse();
// this converts a javascript object to a JSON object
// JSON.stringify();

// let jsonObject = {
//     "name" : "ubani",
//     "age" : 65,
//     "complexion" : "dark",
//     "stack" : "fullstack developer"
// }
// JSON.parse(jsonObject)

// let javascriptObject = {
//     name : "ubani",
//     age : 65,
//     complexion : "dark",
//     stack : "fullstack developer"
// }
// JSON.stringify(javascriptObject)