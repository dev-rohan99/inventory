import mongoose from "mongoose";

const mongoDBConnection = async () => {
    try{

        const connect = await mongoose.connect(process.env.MONGODB_STR);
        
        if(connect){
            console.log("MongoDB Connected!".bgGreen.white);
        }else{
            console.log("MongoDB Connection failed!".bgRed.white);
        }

    }catch(err){
        console.log(err);
    } 
}


export default mongoDBConnection;
