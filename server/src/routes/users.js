const express = require('express')
const {registerNewUser,loginUser,getAllUsers} = require('../controllers/users')
router = express.Router();
router.post('/register',registerNewUser )
router.post('/login',loginUser )
router.get('/users',getAllUsers )
module.exports = router
