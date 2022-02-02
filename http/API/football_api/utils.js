const fs = require('fs');

// create a write function
const writeToFile = (filename, content) =>{
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (error)=>{
        if(error){
            console.log(error.message)
        }else{
            console.log("File written successfully")
        }
    })
}

module.exports = {
    writeToFile
}