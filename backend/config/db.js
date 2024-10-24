const mongoose=require('mongoose');

const connectdb = async()=>{
    try{
       await mongoose.connect('mongodb+srv://bramhasaiyeddula:ankGCtn1rHVsoOpb@cluster0.02xxy.mongodb.net/mydb');
       console.log("Database successfully connected");
    }catch(error){
        console.log(error);
    }
}


module.exports=connectdb;