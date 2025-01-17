const jwt = require("jsonwebtoken")


module.exports.verifyJWT = async (req, res, next) => {

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, 'secret_key')

        req.user = decoded;
     
        next()
    }
    catch (error) {
        res.status(401).json({ msg:"cxcx"})
    }
}


// // Middleware to verify token
// module.exports.verifyJWT = (req, res, next) => {
//     console.log("kfsjgdnfjkldskjfngjldsfkgjlfd")
//   const token = req.cookies.auth_token; // Extract token from cookies
//   if (!token) {
//     return res.status(401).json({ msg: 'Unauthorized' });
//   }

//   jwt.verify(token, 'secret_key', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ msg: 'Unauthorized weeowesik' });
//     }
//     req.user = decoded; 
//     console.log(req.user)// Attach the decoded user to the request object
//     next(); // Proceed to the next middleware or route handler
//   });
// };

// Apply middleware to protected routes
