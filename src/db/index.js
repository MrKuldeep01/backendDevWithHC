import mongoose from "mongoose"
import envConfig from "../../config/envConfig.js"
import constents from "../constents.js"

const connnectDB = async()=>{
    try {
        const connection = await mongoose.connect(`mongodb://${envConfig.dbUri}/${constents.dbname}`)
        console.log("db connected ",connection.connection.host);
    } catch (error) {
        console.error("ERROR :: ",error);
        process.exit(1)
    }
}

export default connnectDB;