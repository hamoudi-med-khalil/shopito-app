const express = require('express')
const {registerUser, loginUser, logout, getUser, getloginStatus, updateUser, updatePhoto} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddelware')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/getuser',protect, getUser)
router.get('/getloginstatus', getloginStatus)
router.patch('/updateuser',protect, updateUser)
router.patch('/updatephoto',protect, updatePhoto)


module.exports = router;