import express from 'express'
import Person from "../models/Person.js";


const router = express.Router()


// POST route to add a person
router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:workType", async (req,res)=>{
    try {
        const workType = req.params.workType

        if(workType == 'chef' || workType == 'waiter' || workType == 'manager')
        {
          const response  = await Person.find({work : workType})
          console.log('Data Fetched for workType')
          res.status(200).json(response)
        }
        else {
          res.status(404).json({error : `Invalid Work Type `})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Internal Server Error`})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id

        const updatedPersonData = req.body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
          new : true, //return the updated document
          runValidators : true // run mongoose validation
        })

        if(!response){
          res.status(404).json({error : `User Not Found`})
        }

        console.log('Updated Successfully')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Internal Server Error`})
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id

    const response = await Person.findByIdAndDelete(personId)

    if(!response){
          res.status(404).json({error : `User Not Found`})
    }

    console.log('Data Deleted')    
    res.status(200).json({message: `Person Deleted Successfully`})
    } catch (error) {
      console.log(error)
      res.status(500).json({error : `Internal Server Error`})
    }

})

export default router