const jwt = require("jsonwebtoken");
const JWT_SECRET = "$Kev@l";


const fetchUser = (req, res, next) => {
    //Get the user from JWT token & add id to req object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).json({Error: "Please, Authenticate using a valid token."});
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).json({Error: "Please, Authenticate using a valid token."});
    }

}

module.exports = fetchUser;