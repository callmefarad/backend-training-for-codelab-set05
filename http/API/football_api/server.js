const http = require('http');
const PORT = 5000;
const {getTeams, getTeam, createNewTeam, createNewDynamicTeam, updateTeam, removeTeam} = require('./controller/footballerController')

const server = http.createServer((req, res)=>{
    if(req.url === "/api/football" && req.method === "GET"){
        res.writeHead(200, {'Content-Type': 'application/json'})
        getTeams(req, res)
    }else if(req.url.match(/\/api\/football\/([0-9]+)/) && req.method === "GET"){
        const id = req.url.split('/')[3]
        getTeam(req, res, id)
    }else if(req.url === "/api/football" && req.method === "POST"){
        createNewTeam(req, res)
    }else if(req.url === "/api/football/dynamic" && req.method === "POST"){
        createNewDynamicTeam(req, res)
    }else if(req.url.match(/\/api\/football\/([0-9]+)/) && req.method === "PUT"){
        const id = req.url.split('/')[3]
        updateTeam(req, res, id)
    }else if(req.url.match(/\/api\/football\/([0-9]+)/) && req.method === "DELETE"){
        const id = req.url.split('/')[3]
        removeTeam(req, res, id)
    }else{
        res.writeHead(400, {'Content-Type': 'application/json'})
        console.log("Bad request")
        res.end(JSON.stringify({"message": "Bad request"}))
    }
});

server.listen(PORT, ()=>{
    console.log(`Server is listening to port: ${PORT}`);
});