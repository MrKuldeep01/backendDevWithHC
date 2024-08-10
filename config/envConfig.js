import dotenv from "dotenv"
dotenv.config();

const dbUri = String(process.env.DB_URI)
const port = String(process.env.PORT)
const corsOrigin = String(process.env.CORS_ORIGIN)

export default { dbUri,port,corsOrigin}