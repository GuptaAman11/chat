const Router = require('express')
const router = Router(); 
const { accessChat, fetchChat, createGroupChat, addToGroupChat, removeFromGroupChat, getAllUser, userInstance, findSingleChat } = require('../controllers/chat');
const { verifyJWT } = require('../middleware/verify');



router.post('/access', verifyJWT ,accessChat) ;
router.get('/fetch', verifyJWT ,fetchChat) ;
router.post('/group', verifyJWT ,createGroupChat) ;
router.post('/add', verifyJWT ,addToGroupChat) ;
router.post('/remove', verifyJWT ,removeFromGroupChat) ;
router.get('/getalluser', verifyJWT ,getAllUser) ;
router.get('/userinst', verifyJWT ,userInstance) ;
router.get('/findsinglechat/:id', verifyJWT ,findSingleChat) ;




module.exports = router;