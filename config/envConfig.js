import dotenv from "dotenv"
dotenv.config();

const dbUri = String(process.env.DB_URI)
const port = String(process.env.PORT)


export default { dbUri,port}