import mongoose from "mongoose";
import envConfig from "../config/envConfig.js";
import connnectDB from "./db/index.js";
import dotenv from "dotenv"
dotenv.config()

// "dev": "npx nodemon -r dotenv/config --experimental-json-modules src/index.js"

/*
-r  flag is used for require, in this we are using this for pre loading the packege dotenv and config it to make availabe all environment variable from .env into process.env
===
--experimental-json-modules 
is used to use experimental features of node that are not fully valid to use in import syntax.

Like this, .json file are not allowed to import with import syntax we need to give assert obj to specify the type of the file.

*/

import abc from "./abc.json" assert {type:"json"}
console.log(abc,"okay")

connnectDB();





/*
// first way is iffi

import express from "express"
const app = express()
console.log(envConfig.dbUri);
(async () => {
  try {
    await mongoose.connect(`mongodb://${envConfig.dbUri}/${DB_NAME}`)
    app.on("error",(error)=>{
        console.log("error in communication retry please! ",error);
        throw error
    })
    app.listen(port,()=>{
        console.log("app is listening on "+port);
    });
  } catch (error) {
    console.error("ERROR :: " + error);
    throw error;
  }
})();
*/


/*     Output is 

node -r dotenv/config --experimental-json-modules src/index.js`
(node:1688) ExperimentalWarning: Importing JSON modules is an experimental 
feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)    
{ name: 'kuldeep kumar', status: 'post graduated' } okay
db connected  127.0.0.1


*/