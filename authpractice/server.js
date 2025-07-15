import express from "express";
import db from "./db.js";
import Person from "./models/Person.js";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json()); // req.body

app.get("/", (req, res) => {
  res.send("Welcome to our Restaurant ");
});

// POST route to add a person
app.post("/person", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is Running");
});
