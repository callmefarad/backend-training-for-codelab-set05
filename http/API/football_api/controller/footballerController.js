const footballModel = require("../model/footballModel");

// get all the data
const getAll = async (req, res) => {
    try{
        const info = await footballModel.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(info));
    }catch(err){
        console.log(err.message)
    }
}

module.exports = {
    getAll
}