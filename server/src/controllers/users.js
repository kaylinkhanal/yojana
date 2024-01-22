const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const saltRounds = 10;
const registerNewUser = async(req, res) => {
  try{
    const existingUser = await  User.findOne({email: req.body.email})
    //if user email already exist, return 403, else create User doc
    if(existingUser){
     return res.status(403).json({
          msg: "User already exist"
      })
    }else{
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
      req.body.password = hashPassword
      await User.create(req.body)
      res.json({
        msg: "registered successfully"
      })
    }
  }catch(err){
    console.log(err)
  }
}


const loginUser = async (req, res) => {
  console.log("Test")
    res.cookie('test', 'test');
    res.send("Cookie Set");
}
module.exports = {loginUser}