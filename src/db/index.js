import mongoose from "mongoose";
import {dbName} from "../constants.js";

export const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log("MongoDB Connected Successfully");
    }catch(error){
        console.log("MongoDB Connection Error : "+error);
    }
}