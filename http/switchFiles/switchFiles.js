const http = require('http')
const port = 2000;
const fs = require('fs');

const app = http.createServer((req, res)=>{
    switch(req.url){
        case "/":
            fs.readFile(__dirname + "/sample.html", (error, data)=>{
                if(error){
                    console.log(error.message)
                }else{
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            })
            break;
         case "/boys":
            fs.readFile(__dirname + "/boys.html", (error, data)=>{
                if(error){
                    console.log(error.message)
                }else{
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            })
            break;
         case "/girls":
            fs.readFile(__dirname + "/girls.html", (error, data)=>{
                if(error){
                    console.log(error.message)
                }else{
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            })
            break;
         case "/staff":
            fs.readFile(__dirname + "/staff.html", (error, data)=>{
                if(error){
                    console.log(error.message)
                }else{
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            })
            break;
        default:
            res.setHeader('Content-Type', 'text/plain');
            res.end("thank you");   
    }
})

app.listen(port, ()=>{
    console.log('listening on port ' + port);
})