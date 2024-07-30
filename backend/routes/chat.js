const Router = require('express')
const router = Router();
const { accessChat, fetchChat, createGroupChat, addToGroupChat, removeFromGroupChat, getAllUser, userInstance } = require('../controllers/chat');
const { verifyJWT } = require('../middleware/verify');



router.get('/access', verifyJWT ,accessChat) ;
router.get('/fetch', verifyJWT ,fetchChat) ;
router.post('/group', verifyJWT ,createGroupChat) ;
router.post('/add', verifyJWT ,addToGroupChat) ;
router.post('/remove', verifyJWT ,removeFromGroupChat) ;
router.get('/getalluser', verifyJWT ,getAllUser) ;
router.get('/userinst', verifyJWT ,userInstance) ;



module.exports = router;