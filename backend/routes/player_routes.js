const express=require("express");
const { getPlayers, addPlayers, updatePlayer, deletePlayer } = require("../controllers/player_controller");
const playerRoutes=express.Router();

playerRoutes.get("/get-players",getPlayers);
playerRoutes.post('/add-players',addPlayers);
playerRoutes.put('/update-player/:id',updatePlayer);
playerRoutes.delete('/delete-player/:id',deletePlayer);
module.exports=playerRoutes; 