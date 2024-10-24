const express=require('express');
const cors=require('cors')
const connectdb = require('./config/db');
const Player=require('./models/player_module');
const playerRoutes = require('./routes/player_routes');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/players',playerRoutes);



app.listen(5000,()=>{
    console.log("Server is Listening at port no 5000");
})


connectdb();