const fs = require('fs');

// read a file
fs.readFile("../students.txt", (error, data)=>{
    if(error){
        console.log("can not read the file" + error)
    }else{
        // console.log(data);
        console.log(data.toString());
    }
});