import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import menuItem from "./models/menu.js";
import personRoutes from './routers/personRoutes.js'
import menuItemRoutes from './routers/menuItemRoutes.js'
import passport from './auth.js';

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json()); // req.body


app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local',{session: false})

app.get("/",localAuthMiddleware, (req, res) => {
  res.send("Welcome to our Restaurant ");
});

//Person routes
app.use('/person',localAuthMiddleware,personRoutes)

//Menu Item routes
app.use('/menuItem',menuItemRoutes)



app.listen(PORT , () => {
  console.log("Server is Running");
});
