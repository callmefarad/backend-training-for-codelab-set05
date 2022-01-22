const fs = require('fs');

if(fs.existsSync("../students.txt")){
    fs.unlink("../students.txt", (error)=>{
        console.log(error);
    });
}else{
    console.log("File does not exist");
}