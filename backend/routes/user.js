 const Router = require('express')
const router = Router();
const { register, login, allUsers, getLoggedInUser } = require('../controllers/user');
const { verifyJWT } = require('../middleware/verify');



router.post('/register', register)
router.post('/login', login)
router.get('/alluser' ,verifyJWT , allUsers )
router.get('/logg' ,verifyJWT , getLoggedInUser )
// router.route('/Profile').post(protect,updateUserProfile)



module.exports = router;