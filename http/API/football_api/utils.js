const fs = require('fs');

const writeToFile = (filename, content) =>{
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (error)=>{
        if(error){
            console.log(error.message)
        }else{
            console.log("Error is written to file")
        }
    });
}


module.exports ={
    writeToFile
}