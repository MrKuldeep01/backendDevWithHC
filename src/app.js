import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import envConfig from "../config/envConfig";
app.use(cors({origin:envConfig.corsOrigin}))
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



export default app