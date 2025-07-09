const errorHandler = (err, req, res, next)=> {
    // console.log(err, req.body)
    if(err.status)
    {
        res.status(err.status).json({msg : err.message})
    } else{
        res.status(500).json({msg : err.message})
    }
    
}

export default errorHandler