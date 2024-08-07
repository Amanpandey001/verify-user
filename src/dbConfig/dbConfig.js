import mongoose from "mongoose";

export async function dbConfig() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log("MongoDB connected successfully");
        })
        connection.on("disconnected", ()=>{
            console.log("MongoDB disconnected");
        })
        connection.on("error", (error)=>{
            console.log("MongoDB error" + error);
            process.exit(1);
        })
    } catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
}