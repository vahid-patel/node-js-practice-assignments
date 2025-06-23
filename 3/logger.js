import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, "logger.txt");

const logMessage = (message) => {
  const time = Date.now();
  const date = new Date(time);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const fullMessage = `(${day}/${month+1}/${year} - ${h}:${m}:${s}) ${message}  \n`;

  const writeStream = fs.createWriteStream(logPath, { flags: "a" });
  writeStream.write(fullMessage);
  writeStream.end();
  // fs.appendFile(logPath, fullMessage, (err)=>{
  //     if(err)
  //         console.log(err.message)
  // })
};

export default logMessage;
