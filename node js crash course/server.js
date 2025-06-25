import express from 'express' // const express = require("express");
const app = express();
import posts from './routes/posts.js'  // const posts = require('./routes/posts')
const ports = process.env.PORT || 3000;
import logger  from './middleware/logger.js';
import path from 'path'
import errorHandler from './middleware/error.js';
// setup static folder
// app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req,res)=> {
//     res.sendFile(path.join(__dirname, "public", "index.html"))
// })

// app.get('/about', (req,res)=> {
//     res.sendFile(path.join(__dirname, "public", "about.html"))
// })

//body Parser middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))



//logger middleware 
// app.use(logger)

app.use('/apis/posts', posts)

// Error middleware
app.use(errorHandler)


app.listen(ports, () => console.log(`Server is running port ${ports}`));

