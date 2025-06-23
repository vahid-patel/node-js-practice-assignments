import express from "express";
// import logMessage from './logger.js'
import log from './logger.js'
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const largeText = path.join(__dirname,"largeTextFile.txt")

const app = express();

app.use(express.json());

// app.get('/', (req, res)=>{
//   const method = req.method()
//   logMessage('hello im root')
//   res.json({messsage: 'hello im root'})
// })

//Synchronous

// create
app.get("/create/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;
  const content = `hi I am ${username}`;
  

  try{
      fs.writeFileSync(File, content);
      log(`File Created Successfully by Synchronous method `)
      return res.status(200).json({ msg: `file successfully created` });

  }catch(err){
    log(`Failed to create file by synchronous method`)
    return res.status(400).send(err.message)
  }
});

//read
app.get("/read/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;

  try {
    const data = fs.readFileSync(File, "utf-8");
    log(`File read Successfully by Synchronous method`)
    return res.status(200).send(data);
  } catch (err) {
    log(`Failed to read file by synchronous method`)
    return res.status(400).send(err.message)
  }
});

//update
app.put("/update", (req, res) => {
  const { username, message } = req.body;
  const File = `${username}.txt`;

  try {
    fs.appendFileSync(File, message);
    log(`File updated Successfully by Synchronous method`)

    return res.status(200).send(`file name ${username}.txt Updated Successfully`);
  } catch (err) {
    log(`Failed to update file by synchronous method`)
    return res.status(400).send(err.message)
  }
});

//delete
app.delete("/delete/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;

  try {
    fs.unlinkSync(File);
    log(`File deleted Successfully by Synchronous method`)
    res.send(`file name ${username}.txt deleted succesfully`);
  } catch (err) {
    log(`Failed to deleted file by synchronous method`)
    return res.status(400).send(err.message)
  }
});

//Asynchronous

// //create
// app.get("/create/:username", (req, res) => {
//   const { username } = req.params;
//   const File = `${username}.txt`;
//   const content = `hi I am ${username}`;

//   fs.writeFile(File, content, (err) => {
//     if(err){
//         log(`Failed to create file by Asynchronous method`)
//         return res.send(err)
//     }
//   });

//   log(`File Created Successfully by Asynchronous method `)  
//   return res.status(200).json({ msg: `file successfully created` });
// });

// //read
// app.get("/read/:username", (req, res) => {
//   const { username } = req.params;
//   const File = `${username}.txt`;
//   fs.readFile(File, "utf-8",(err,data)=>{
//     if(err){
//         log(`Failed to read file by Asynchronous method`)
//         return res.send(err)
//     }
//     else{
//         log(`File read Successfully by Asynchronous method`)
//         return res.status(200).send(data)
//     }
//   });

// });

// //update
// app.put("/update", (req, res) => {
//   const { username, message } = req.body;
//   const File = `${username}.txt`;

//   fs.appendFile(File, message,(err)=>{
//     if(err){
//         log(`Failed to update file by synchronous method`)
//         return res.send(err)
//     }
//   });
//   log(`File updated Successfully by Asynchronous method`)
//   return res.status(200).send(`file name ${username}.txt Updated Successfully`);
// });

// //delete
// app.delete("/delete/:username", (req, res) => {
//   const { username } = req.params;
//   const File = `${username}.txt`;

//   fs.unlink(File,(err)=>{
//     if(err)
//     {
//         log(`Failed to deleted file by synchronous method`)
//         return res.send(err)
//     }
//   });
//   log(`File deleted Successfully by Asynchronous method`)
//   res.send(`file name ${username}.txt deleted succesfully`);
// });

const readStream = fs.createReadStream(largeText,'utf-8')
readStream.on('data',(chunk)=> console.log(chunk))
readStream.on('end',()=> console.log('Finished'))


app.get('/log',(req,res)=>{
    fs.readFile("logger.txt", "utf-8", (err, data) => {
    if (err) {
      log(`Error reading log file: ${err.message}`);
      return res.status(500).send("Could not read log file");
    }
    res.send(data); 
  });
})
app.listen(3000, () => {
  console.log(`Server is running`);
});
