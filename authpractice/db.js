import mongoose from "mongoose";

//Define the MongoDB connection URL
// const mongoURL = 'mongodb+srv://ayyubbhai1885:vahidpatel123@cluster0.blcdvyl.mongodb.net/authPractice'

//set up mongoDB connection
mongoose.connect(process.env.mongoURL,{
    
})

//Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection

//Define Event Listeners for database connection
db.on('connected',()=>{
    console.log("connected to MongoDB Server")
})

db.on('error',(err)=>{
    console.error('MongoDB connection error : ',err)
})

db.on('disconnected', ()=>{
    console.log('MongoDB Disconnected')
})

export default db