import app from "./app.js"
import connnectDB from "./db/index.js";
import dotenv from "dotenv"
import envConfig from "../config/envConfig.js";
dotenv.config()
const port = envConfig.port || 3000;
//in packege.json file => "dev": "npx nodemon -r dotenv/config --experimental-json-modules src/index.js"

/*
-r  flag is used for require, in this we are using this for pre loading the packege dotenv and config it to make availabe all environment variable from .env into process.env
===
--experimental-json-modules 
is used to use experimental features of node that are not fully valid to use in import syntax.

Like this, .json file are not allowed to import with import syntax we need to give assert obj to specify the type of the file.

*/

// every async func always return a promise and we can handle as :
connnectDB().then(()=>{
app.on("error",(err)=>{
  console.log("ERROR : in communication to DB :: ",err);
})
app.listen(port,()=>{
  console.log(`app is listening on http://localhost:${port}/`);
})
}).catch((err)=>{
  console.log("ERROR : mongodb connection failed :: ",err);
  process.exit(1);
})





/*
// first way is IIFE [ Imediatly Invoked Function Expression ]

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