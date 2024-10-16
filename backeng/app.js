const express =require('express')
const cors = require ('cors')
const axios = require ('axios')
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(cors({origin: true}));

app.post("/authenticate", async (req, res)=>{
    const {username} = req.body;
    console.log(username)

    try{
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            {username: username, secret: username, first_name: username},
            {
                headers: {
                    "private-key": process.env.REACT_APP_CHAT_PROJECT_KEY
                }
            }
        );
        return res.status(r.status).json(r.data)
    }catch(e){
        return res.status(e.response.status).json(e.response.data);
    }
    
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});