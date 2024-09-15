const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config")

const authMiddleware = (req,res,next) => {
    const bearer = req.headers.authorization
    if(!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(403).json({})
    }
    token = bearer.split(" ")[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.userId) {
            req.userId = decoded.userId
            next()
        }
        else {
            return res.status(403).json({})
        }
    }
    catch(e) {
        return res.status(411).json({})
    }
}

module.exports = authMiddleware