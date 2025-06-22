import fs from 'fs'
import path from 'path'

import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname,"logger.txt")

const logMessage = (message)=>{
    const time = new Date().toISOString();
    const fullMessage = `(${time}) ${message}\n`

    fs.appendFile(logPath, fullMessage, (err)=>{
        if(err)
            console.log(err.message)
    })
}

export default logMessage;