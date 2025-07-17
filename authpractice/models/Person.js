import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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
    },
    username : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})


personSchema.pre('save',async function (next) {
    const person = this

    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')){
        next()
    }

    try {
        //salt password generation
        const salt = await bcrypt.genSalt(10)

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)

        //Override the plain password with the hashed one
        person.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }

})

personSchema.methods.comparePassword = async function (candidatePassword)
{
    try {
        console.log(this.password)
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

//Create a Person Model
const Person = mongoose.model('Person',personSchema)

export default Person