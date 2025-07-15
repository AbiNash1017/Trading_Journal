import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=> console.log("Database Connected"));
        mongoose.connect(`${process.env.MONGODB_URI}/ForeNotes`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;