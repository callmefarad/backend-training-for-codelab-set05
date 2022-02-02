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
const createNewTeam = async (req, res) =>{
    try{
        // create a fake object having some data
        const bodyData = {
            club: "sevilla",
            player: 25,
            country: "Spain"
        }

        const newTeam = await FootballModel.create(bodyData)  
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(newTeam))      

    }catch(error){
        console.log(error.message)
    }
}

// creating a dynamic team
const createNewDynamicTeam = async (req, res) =>{
    try{
        let body = ''
        req.on('data', function(chunk){
            body += chunk.toString()
        })
        req.on('end', async function() {
            const {club, player, country} = JSON.parse(body)
            const bodyData = {
                club,
                player,
                country
            }
            const newTeam = await FootballModel.createDynamic(bodyData)  
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(newTeam))
        })
    }catch(error){
        console.log(error.message)
    }
}

module.exports = {
    getTeams,
    getTeam,
    createNewTeam,
    createNewDynamicTeam
}

const [body, setBody] = useState('')