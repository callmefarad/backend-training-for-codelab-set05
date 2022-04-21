const fs = require('fs');

// a function that writes to file
const writeToFile = (filename, content)=>{
    fs.writeFileSync(filename, JSON.stringify(content), (error)=>{
        if(error){
            console.log('There was an error trying to write to file')
        }else{
            console.log('File written successfully')
        }
    })
}

module.exports = {
    writeToFile
}