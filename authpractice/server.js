import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import menuItem from "./models/menu.js";
import personRoutes from './routers/personRoutes.js'
import menuItemRoutes from './routers/menuItemRoutes.js'
const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json()); // req.body

app.get("/", (req, res) => {
  res.send("Welcome to our Restaurant ");
});

//Person routes
app.use('/person',personRoutes)

//Menu Item routes
app.use('/menuItem',menuItemRoutes)



app.listen(PORT , () => {
  console.log("Server is Running");
});
