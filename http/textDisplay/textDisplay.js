const http = require('http');
const port = 8080;

const app = http.createServer((req, res)=>{
    // serving plain text to the client/browser
    res.writeHead(200);
    res.write("Vanilla HTTP REST API.")
    res.end();
});

const app = http.createServer(testing);

app.listen(port, ()=>{
    console.log('listening on port ' + 8080)
});
