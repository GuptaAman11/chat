 const Router = require('express')
const router = Router();
const { register, login, allUsers, getLoggedInUser } = require('../controllers/user');
const { verifyJWT } = require('../middleware/verify');
const upload = require("../utils/multer")




router.post('/register', upload.single("file"), register)
router.post('/login', login)
router.get('/alluser' ,verifyJWT , allUsers )
router.get('/logg' ,verifyJWT , getLoggedInUser )
// router.route('/Profile').post(protect,updateUserProfile)



module.exports = router;