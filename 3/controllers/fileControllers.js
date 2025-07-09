import fs from 'fs'
import log from '../middleware/logger.js'

//Synchronous

//create
export const createFile = (req,res,next)=>{
  const { username } = req.params;
  const File = `${username}.txt`;
  const content = `hi I am ${username}`;
  

  try{
      fs.writeFileSync(File, content);
      log(`File Created Successfully by Synchronous method `)
      return res.status(200).json({ msg: `file successfully created` });

  }catch(err){
    log(`Failed to create file by synchronous method`)
    err.status = 400
    return next(err)
  }
}

//read
export const readFile =  (req, res,next) => {
  const { username } = req.params;
  const File = `${username}.txt`;

  try {
    const data = fs.readFileSync(File, "utf-8");
    log(`File read Successfully by Synchronous method`)
    return res.status(200).send(data);
  } catch (err) {
    log(`Failed to read file by synchronous method`)
    err.status = 400
    return next(err)  }
}

//update
export const updateFile = (req, res,next) => {
  const { username, message } = req.body;
  const File = `${username}.txt`;

  try {
    fs.appendFileSync(File, message);
    log(`File updated Successfully by Synchronous method`)

    return res.status(200).send(`file name ${username}.txt Updated Successfully`);
  } catch (err) {
    log(`Failed to update file by synchronous method`)
    err.status = 400
    return next(err)  }
}

//delete
export const deleteFile = (req, res,next) => {
  const { username } = req.params;
  const File = `${username}.txt`;

  try {
    fs.unlinkSync(File);
    log(`File deleted Successfully by Synchronous method`)
    res.send(`file name ${username}.txt deleted succesfully`);
  } catch (err) {
    log(`Failed to deleted file by synchronous method`)
    err.status = 400
    return next(err)  }
}

// Asynchronous 

// //create
// export const createFile = (req, res,next) => {
//   const { username } = req.params;
//   const File = `${username}.txt`;
//   const content = `hi I am ${username}`;

//   fs.writeFile(File, content, (err) => {
//     if(err){
//         log(`Failed to create file by Asynchronous method`)
//         err.status = 400
//         return next(err)    }
//   });

//   log(`File Created Successfully by Asynchronous method `)  
//   return res.status(200).json({ msg: `file successfully created` });
// }

// //read
// export const readFile =  (req, res,next) => {
//  const { username } = req.params;
//   const File = `${username}.txt`;
//   fs.readFile(File, "utf-8",(err,data)=>{
//     if(err){
//         log(`Failed to read file by Asynchronous method`)
//         err.status = 400
//         return next(err)    }
//     else{
//         log(`File read Successfully by Asynchronous method`)
//         return res.status(200).send(data)
//     }
//   });
// }

// //update
// export const updateFile = (req, res,next) => {
//  const { username, message } = req.body;
//   const File = `${username}.txt`;

//   fs.appendFile(File, message,(err)=>{
//     if(err){
//         log(`Failed to update file by synchronous method`)
//         err.status = 400
//         return next(err)    }
//   });
//   log(`File updated Successfully by Asynchronous method`)
//   return res.status(200).send(`file name ${username}.txt Updated Successfully`);
// }

// //delete
// export const deleteFile = (req, res,next) => {
//  const { username } = req.params;
//   const File = `${username}.txt`;

//   fs.unlink(File,(err)=>{
//     if(err)
//     {
//         log(`Failed to deleted file by synchronous method`)
//         err.status = 400
//         return next(err)    }
//   });
//   log(`File deleted Successfully by Asynchronous method`)
//   res.send(`file name ${username}.txt deleted succesfully`);
// }