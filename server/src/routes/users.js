const express = require('express')
const {registerNewUser,loginUser,getAllUsers, changePassword,getUserAvatar} = require('../controllers/users')
router = express.Router();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

//middleware
router.post('/register',  upload.single('avatar'),  registerNewUser )
router.post('/login',loginUser )
router.get('/users',getAllUsers )
router.get('/avatar/:id',getUserAvatar )

//routes for change password
router.post('/change-password', changePassword)
module.exports = router
