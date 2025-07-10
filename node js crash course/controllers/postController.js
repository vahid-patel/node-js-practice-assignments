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

//@desc   Get all posts 
//@route  apis/posts
export const getAllPosts = (req, res) => {
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

}

//@desc   Get single posts 
//@route  apis/posts/:id
export const getSinglePost = (req, res , next) => {
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
}

//@desc   Create new post 
//@route  apis/posts/
export const createNewPost = (req,res,next)=> {
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
}

//@desc   Update a post 
//@route  apis/posts/:id
export const updatePost = (req,res,next)=> {
    const id = parseInt(req.params.id)
    const post = posts.find((post)=> post.id === id)
    if(!post)
    {
        const err = new Error(`a post with the id of ${id} is not found`)
        err.status= 400
        return next(err)
    }

    post.title = req.body.title
    res.status(200).json(posts)
}


//@desc   Delete a post 
//@route  apis/posts/:id
export const deletePost = (req,res,next)=> {
    const id = parseInt(req.params.id)
    const post = posts.find((post)=> post.id === id)

    if(!post)
    {
        const err = new Error(`a post with the id of ${id} is not found`)
        err.status= 400
        return next(err)
    }

    posts = posts.filter((post)=> post.id !== id)
    res.status(200).json(posts)
}