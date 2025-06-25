const Validate = (req,res,next)=>{
    const {name,age} = req.body

      if(typeof name !== 'string' || name.trim() === '')
      {
        const err = new Error(`name must be a string and it should not be empty`)
        err.status = 400
        return next(err)
      }
        

    if(typeof age !== 'number')
         {
        const err = new Error(`age must be a number`)
        err.status = 400
        return next(err)
      }

    next()
}

export default Validate