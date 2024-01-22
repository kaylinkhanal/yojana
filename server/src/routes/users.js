const express = require('express')
const {registerNewUser,loginUser} = require('../controllers/users')
router = express.Router();
// router.post('/register',registerNewUser )
router.get('/login',loginUser )
module.exports = router
