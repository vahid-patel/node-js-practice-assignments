// build a express server and create api to handle a user Obejct
// Prevent duplicate names.
// Validate inputs (e.g., name must be a string, age must be a number).


import express from 'express'
import Validate from './middleware/validater.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded())

let user = []

app.use(Validate)

app.post('/user',(req,res,next)=>{

    const {name,age} = req.body
  
    if(user.find((user)=> user.name.toLowerCase() === name.toLowerCase())){

        const err = new Error(`user already exist `)
        err.status = 400
        return next(err)
    }

    const newUser = {name,age}
    user.push(newUser)
    
    return res.status(200).json({msg:`user Added successfully`})

    
})

app.get('/user',(req,res)=>{
    res.json(user)
})

const errorHandler = (err,req,res,next)=>{
    if(err.status){
        res.status(err.status).json({msg: err.message})
    }
    else {
        res.status(500).json({msg: err.message})
    }
}

app.use(errorHandler)

app.listen(3000,()=>{
    console.log(`Server is Running`)
})