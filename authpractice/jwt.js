import jwt from "jsonwebtoken";

export const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization)
        return res.status(401).json({error : 'No Token'})

    //Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error : `Unauthorized`})

    try {
        //Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Attach user information to the request object 
        req.user = decoded
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({error : 'Invalid token'})
    }
}

//Function to generate JWT token
export const generateToken = (userData) => {
    //Generate a new JWT token using user data
    return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn : '1d'})
}

