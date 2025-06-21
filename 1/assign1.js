import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded())

let user = []

app.post('/user',(req,res)=>{

    const {name,age} = req.body
    if(typeof name !== 'string' || name.trim() === '')
        return res.status(400).json({msg:'name must be a string and it should not be empty'})

    if(typeof age !== 'number')
        return res.status(400).json({msg:`age must be a number `})

    if(user.find((user)=> user.name.toLowerCase() === name.toLowerCase()))
        return res.status(400).json({msg:`user already exist `})

    const newUser = {name,age}
    user.push(newUser)
    return res.status(200).json({msg:`user Added successfully`})

    
})

app.get('/user',(req,res)=>{
    res.json(user)
})

app.listen(3000,()=>{
    console.log(`Server is Running`)
})