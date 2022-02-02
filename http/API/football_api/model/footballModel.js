const FootballData = require('../data/dummy.json')
const {v4: uuidv4} = require('uuid')
const {writeToFile} = require('../utils')

const allTeam = ()=>{
    return new Promise((resolve, reject)=>{
        resolve(FootballData);
    })
}

const oneTeam = (id)=>{
    return new Promise((resolve, reject)=>{
        const team = FootballData.find((t)=>t.id === id)
        resolve(team)
    })
}

const create = (team) =>{
    return new Promise((resolve, reject)=>{
        const newTeam = {id: uuidv4(), ...team}
        FootballData.push(newTeam)
        // write the team to the file
        writeToFile('./data/dummy.json', FootballData)
        resolve(newTeam)
    })
}

const createDynamicTeam = (team) =>{
    return new Promise((resolve, reject)=>{
        const newTeam = {id: uuidv4(), ...team}
        FootballData.push(newTeam)
        // save the newTeam to file
        writeToFile('./data/dummy.json', FootballData)
        resolve(newTeam)
    })
}

const update = (id, team) =>{
    return new Promise((resolve, reject)=>{
        const index = FootballData.findIndex((i)=>(i.id === id))
        FootballData[index] = {id, ...team}
        writeToFile('./data/dummy.json', FootballData)
        resolve(FootballData[index])
    })
}


module.exports = {
    allTeam,
    oneTeam,
    create,
    createDynamicTeam,
    update
}