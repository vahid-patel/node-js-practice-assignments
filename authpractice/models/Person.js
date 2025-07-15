import mongoose from "mongoose";

//Define the Person Schema
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    age : {
        type : Number
    },

    work : {
        type : String,
        enum : ['chef','waiter','manager'],
        required : true,
    },

    mobile:{
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    address : {
        type : String,
    },

    salary : {
        type : Number,
        required : true
    }
})

//Create a Person Model
const Person = mongoose.model('Person',personSchema)

export default Person