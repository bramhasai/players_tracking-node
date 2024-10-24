const Player=require("../models/player_module");

const getPlayers=async (req,res)=>{
    try{
        const data=await Player.find({});
        res.status(200).send({
            success:true,
            message:"Data of players",
            data
        })
    }catch(error){
        res.status(404).send({
            success:false,
            message:"INTERNAL ERROR",
            error
        })
    }
}

const addPlayers=async (req,res)=>{
    try{
        const {first_name,last_name,dob,email,phone,role,available}=req.body;
        if(!first_name || !last_name || !dob || !email || !phone || !role || !available){
            return res.status(400).send({
                success:false,
                message:"Each field is mandatory"
            })
        }
        const dobDate =new Date(dob);
        await Player({
            first_name,
            last_name,
            dob : dobDate,
            email,
            phone,
            role,
            available
        }).save()
        res.status(200).send({
            success:true,
            message:"Data added successfully!!!"
        })
    }catch(error){
        res.status(404).send({
            success:false,
            message:"Data not added",
            error
        })
    }
}

const updatePlayer=async(req,res)=>{
    try{
        const player_id = req.params.id;
        await Player.updateOne({_id:player_id},{$set:req.body});
        res.status(200).send({
            success:true,
            message:"Player details updated"
        })

    }catch(error){
        console.log(error);
        res.status(404).send({
            success:false,
            message:"INTERNAL ERROR",
            error
        })
    }
}

const deletePlayer=async(req,res)=>{
    try{
        const player_id = req.params.id;
        await Player.deleteOne({_id:player_id});
        res.status(200).send({
            success:true,
            message:"Player deleted successfully"
        })
    }catch(error){
        console.log(error);
        res.status(404).send({
            success:false,
            message:"INTERNAL ERROR",
            error
        })
    }
}

module.exports={getPlayers,addPlayers,updatePlayer,deletePlayer};