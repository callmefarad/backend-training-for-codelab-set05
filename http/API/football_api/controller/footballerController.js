const FootballModel = require("../model/footballModel");

// get all the teams
const getTeams = async (req, res) => {
    try{
        const teams = await FootballModel.allTeam()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(teams));
    }catch(e){
        console.log(e.message);
    }
}

// get a team 
const getTeam = async(req, res, id)=>{
    try{
        const teamID = await FootballModel.oneTeam(id)
        if(!teamID){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({"message": "Team not found"}));
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(teamID))
        }
    }catch(error){
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(error.message)
    }
}

// create a static team
const addTeam = async (req, res) =>{
    try{
        const fakeData = {
            club: "ajax",
            player: 25,
            country: "Holland"
        }

        const newData = await FootballModel.create(fakeData)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newData))
    }catch(error){
        console.log(error.message)
    }
}

// create dynamic team
const addDynamicTeam = async (req, res) =>{
    try{
        let body = ''
        req.on('data', function(chunk){
            body += chunk.toString()
        })
        req.on('end', async function(){
            const {club, player, country} = JSON.Parse(body)

            const fakeData = {
                club,
                player,
                country
            }

            const newData = await FootballModel.create(fakeData)
            res.writeHead(201, {'content-type': 'application/json'})
            res.end(JSON.stringify(newData),)
        })
    }catch(error){
        console.log(error.message)
    }
}
// update a team
const updateOneTeam = async (req, res, id) => {
    try{
        const teamID = FootballModel.oneTeam(id)
        if(!teamID){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({"message": "Team not found"}))
        }else{
            let body = ''
            req.on('data', function(chunk){
                body += chunk.toString()
            })
            req.on('end',async function(){
                const {club, player, country} = JSON.parse(body)
                const bodyData = {
                    club: club || FootballModel.club,
                    player: player || FootballModel.player,
                    country: country || FootballModel.country
                }

                const updatedTeam = await FootballModel.update(id, bodyData)
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(updatedTeam))
            })
            
        }
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    getTeams,
    getTeam,
    addTeam,
    addDynamicTeam,
    updateOneTeam
}