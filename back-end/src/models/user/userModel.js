import mongoose from "mongoose";

const userDataSchema = mongoose.Schema({

    firstName  :{
        type : String,
        trim : true
    },

    lastName : {
        type : String,
        trim : true
    },

    email : {
        type : String,
        trim : true,
        unique : true
    },

    phone : {
        type : String,
        trim : true,
        unique : true
    },

    password : {
        type : String,
        trim : true
    },

    avatar : {
        type : String
    },

    createdDate : {
        type : Date,
        default : Date.now()
    }

}, {
    timestamps : true
});

const userModel = mongoose.model("users", userDataSchema);
export default userModel;
