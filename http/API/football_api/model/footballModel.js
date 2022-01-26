const footballData = require('../data/dummy.json')

const findAll = (req, res)=>{
    return new Promise((resolve, reject)=>{
        resolve(footballData);
    });
    
}

module.exports = {
    findAll
}