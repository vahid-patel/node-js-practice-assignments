import express from 'express' // const express = require("express")
import errorHandler from '../middleware/error.js';
const router = express.Router()

let posts = [
  {
     id: 1, title: "Post One"
  },
  {
     id: 2, title: "Post Two" 
  },
  { 
    id: 3, title: "Post Three" 
  }
];



router.get("/", (req, res) => {
    console.log('hello')
    const limit = parseInt(req.query.limit)
//   console.log(req.query)
    if(!isNaN(limit) && limit > 0)
    {   console.log(req.query.limit)
        res.status(200).json(posts.slice(0,limit))
    }
    else{
          res.status(200).json(posts);
    }

});

router.get("/:id",(req, res , next) => {
  const id = parseInt(req.params.id);
  console.log(id)
  const post = posts.find((post)=> post.id === id)
//   res.json(posts.filter((post) => post.id == id));
    if(!post){
        const err = new Error(`post with the id of ${id} is not found`)
        err.status= 404
        return next(err)
    }
    else{
        res.status(200).json(post)
    }
});

// create new post
router.post('/', (req,res,next)=> {
    console.log(req.body)
    const newPost = {
        id : posts.length + 1,
        title : req.body.title
    }

    if(!newPost.title){
        const err = new Error(`please include a title`)
        err.status= 400
        return next(err)
    }

    posts.push(newPost)

    res.status(201).json(posts)
})

// Update post 
router.put('/:id', (req,res,next)=> {
    const id = parseInt(req.params.id)
    const post = posts.find((post)=> post.id === id)
    if(!post)
    {
        return res.status(404).json({msg : `a post with the id of ${id} is not found`})
    }

    post.title = req.body.title
    res.status(200).json(posts)
})

// Delete post 
router.delete('/:id', (req,res,next)=> {
    const id = parseInt(req.params.id)
    const post = posts.find((post)=> post.id === id)

    if(!post)
    {
        return res.status(404).json({msg : `a post with the id of ${id} is not found`})
    }

    posts = posts.filter((post)=> post.id !== id)
    res.status(200).json(posts)
})

export default router // module.exports = router