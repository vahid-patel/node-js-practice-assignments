import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local'
import Person from "./models/Person.js";


passport.use(new LocalStrategy( async (username, password, done) => {

    try {
        console.log('Credentials Recieved :', username, password)

        const user = await Person.findOne({username : username})
        if(!user)
        {
          done(null, false, {message : `username not found`})
        }

        const isPasswordCorrect = await user.comparePassword(password)

        if(isPasswordCorrect){
          done(null, user)
        }
        else {
          done(null,false, {message : `password is incorrect`})
        }
    } catch (error) {
        done(error)
    }
}))

export default passport