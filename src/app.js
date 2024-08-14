import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import envConfig from "../config/envConfig.js";
app.use(cors({origin:envConfig.corsOrigin}))
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import statements

import userRouter from "./routes/user.router.js";

// router declaration as a middelware --- 

app.use("/user",userRouter)


export default app