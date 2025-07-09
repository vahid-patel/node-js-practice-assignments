// -task is to create a logger file for server.
// -use server which we created in previous sessions and add error handling to api's.
// -download large txt file from internet and stream that file to server.
// -Add exception handling.
// -append new logs of the server with time stamps in logger file.
// -create logger api which will send logger file to server in response.
// (optional: calculate time taken for completion of the request and add it to logger file) 

import express from "express";
import log from './middleware/logger.js'
import errorHandler from "./middleware/errorHandler.js";
import fs from "fs";
import path from "path";
import fileRoutes from './routes/fileRoutes.js'

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const largeText = path.join(__dirname,"largeTextFile.txt")
const logtext = path.join(__dirname,'./middleware/logger.txt')

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/file',fileRoutes)

const readStream = fs.createReadStream(largeText,'utf-8')
readStream.on('data',(chunk)=> console.log(chunk))
readStream.on('end',()=> console.log('Finished'))


app.get('/log',(req,res,next)=>{
    fs.readFile(logtext, "utf-8", (err, data) => {
    if (err) {
      log(`Error reading log file: ${err.message}`);
        err.status = 400
        return next(err)
    }
    res.send(data); 
  });
})



app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Server is running`);
});
