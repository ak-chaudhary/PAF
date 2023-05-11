import mongoose from "mongoose"; //performing crud
import colors from "colors";
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongodb database ${conn.connection.host}`.bgMagenta.white
        );
    }catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;