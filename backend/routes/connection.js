const Router = require('express')
const router = Router();
const { verifyJWT } = require('../middleware/verify');
const {  connectionAccepted, findPendingRequest, sendConnection, findUnconnectedUsers, findDisplayUsers } = require('../controllers/connection');

router.post('/connect', verifyJWT ,sendConnection )
router.post('/status', verifyJWT ,connectionAccepted )
router.get('/req', verifyJWT ,findPendingRequest )
router.get('/abc', verifyJWT ,findUnconnectedUsers )
router.get('/friends', verifyJWT ,findDisplayUsers )





module.exports = router;