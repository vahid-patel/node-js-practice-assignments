import express from 'express'
import menuItem from '../models/menu.js'


const router = express.Router()


router.post('/', async (req,res)=>{
    try {
        const data = req.body

        const newMenuItem = new menuItem(data)

        const response = await newMenuItem.save()
        console.log('menu Item Saved')

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Internal Server Error`})
    }
})

router.get('/',async (req,res)=>{
    try {
        const data = await menuItem.find()
        console.log('menuItems fetched successfully')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Internal Server Error`})
        
    }
})

router.get('/:taste', async (req,res)=>{
    try {
        
    const tastetype = req.params.taste

    if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour')
    {
        const response = await menuItem.find({taste : tastetype})
        console.log('Data fetched for taste')
        res.status(200).json(response)
    }
    else{
        res.status(404).json({error : `Invalid entry`})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({error : `Internal Server Error`})
    }
})



export default router