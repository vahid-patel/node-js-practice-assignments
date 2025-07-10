import express from 'express' // const express = require("express")
import {
    getAllPosts,getSinglePost,createNewPost,updatePost,deletePost
} from '../controllers/postController.js'

const router = express.Router()

//Get All Posts
router.get("/", getAllPosts);

//Get Single Post
router.get("/:id",getSinglePost);

// create new post
router.post('/', createNewPost)

// Update post 
router.put('/:id', updatePost)

// Delete post 
router.delete('/:id', deletePost)

export default router // module.exports = router