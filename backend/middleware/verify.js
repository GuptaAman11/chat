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