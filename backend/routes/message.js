const Router = require('express')
const router = Router();
const { accessChat, fetchChat, createGroupChat, addToGroupChat, removeFromGroupChat, getAllUser, userInstance } = require('../controllers/chat');
const { verifyJWT } = require('../middleware/verify');
const { addMessage, allMessages } = require('../controllers/message');

router.post('/addmessage' , verifyJWT ,addMessage )
router.get('/allmessage/:chatId' , verifyJWT ,allMessages )





module.exports = router;