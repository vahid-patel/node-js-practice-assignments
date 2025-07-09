import express from 'express'

import {
    createFile,
    readFile,
    updateFile,
    deleteFile
} from '../controllers/fileControllers.js'


const router = express.Router()

// create
router.get("/create/:username", createFile);

//read
router.get("/read/:username", readFile);

//update
router.put("/update",updateFile);

//delete
router.delete("/delete/:username", deleteFile);

export default router