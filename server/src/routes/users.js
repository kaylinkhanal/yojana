const express = require('express')
const {registerNewUser,loginUser,getAllUsers, changePassword} = require('../controllers/users')
router = express.Router();
router.post('/register',registerNewUser )
router.post('/login',loginUser )
router.get('/users',getAllUsers )

//routes for change password
router.post('/change-password', changePassword)
module.exports = router
