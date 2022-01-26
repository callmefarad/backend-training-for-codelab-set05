const http = require('http');
const PORT = 5000;
// const footballController = require('./controller/footballerController')
const {getAll} = require('./controller/footballerController')

const server = http.createServer((req, res)=>{
    if(req.url === "/api/football"){
        res.writeHead(200, {'Content-Type': 'application/json'})
        getAll(req, res)
    }else{
        console.log("error in loading this page")
    }
});

server.listen(PORT, ()=>{
    console.log(`Server is listening to port: ${PORT}`);
});