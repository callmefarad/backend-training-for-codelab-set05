const http = require('http');
const fs = require('fs');
// const fs = require('fs').promise;
const port = 8080;

const app = http.createServer((req, res)=>{
    // first way of passing an HTML file
    fs.readFile(__dirname + "/sample.html", (error, data)=>{
        if(error){
            console.log(error.message)
        }else{
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });

    // second way of this
    // fs.readFile(__dirname + "/sample.html")
    // .then(contents=>{
    //     res.setHeader('Content-Type', 'text/html');
    //     res.end(contents);
    // }).catch(error=>{
    //     res.end(error)
    //     return;
    // });
})

app.listen(port, ()=>{
    console.log('listening on port ' + 8080)
})
