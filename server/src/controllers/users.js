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
  try {
    const userDetail = await User.findOne({ email: req.body.email });
    if (userDetail) {
      const matched = await bcrypt.compare(
        req.body.password,
        userDetail.password
      );
      if (matched) {
        const token = jwt.sign(
          { email: userDetail.email },
          process?.env.SECRET_KEY
        );
        return res.status(201).json({ msg: "Login Successfully", token });
      } else {
        return res.status(403).json({ msg: "Password didn't match" });
      }
    } else {
      return res.status(401).json({ msg: "Email not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Login failed" });
  }
};

module.exports = {loginUser, registerNewUser}