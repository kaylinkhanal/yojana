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
    const userDetails = await User.findOne({ email: req.body.email });
    if (userDetails) {
      const matched = await bcrypt.compare(
        req.body.password,
        userDetails.password
      );
      if (matched) {
        const token = jwt.sign(
          { email: userDetails.email },
          process?.env.SECRET_KEY
        );
        return res.status(201).json({ msg: "Login Successfully", token, userDetails });
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

const getAllUsers = async(req,res)=> {
  try{
    if(!req.query.page) {
      const userList = await User.find().select('fullName email')
      return res.json({userList})
    }
    const count =await User.find().count()
    const skipCount = 5* (req.query.page-1)
    const userList = await User.find().limit(5).skip(skipCount)
    return res.json({userList,count})
  }catch(err){
    console.log(err)
    res.status(400).json({ msg: "Failed to Fetch User" });
  }

}


//controllers for change password

const changePassword = async (req, res) => {

  try {
    //fetching all the details of user by id
    const userById = await User.findOne({ _id: req.body.id })
   
    //error showing while id not found in database
    if (!userById) {
        return res.json({ msg: 'No user found', check:false })
    }

    //if id is found then, input currentPassword is matched with the password in database
    const passwordMatch = await bcrypt.compare(req.body.currentPassword, userById.password)

    //if password is matched then, our newPassword will encrypt at first and then will replaced with the database password
    if (passwordMatch) {
      const hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
      userById.password = hashPassword
      await userById.save();

      res.json({ msg: "password changed successfully", check:true })
    } else {
      res.json({ msg: "wrong current password", check:false })
    }

  } catch (err) {
    console.log(err)
  }

}

module.exports = {loginUser, registerNewUser,getAllUsers, changePassword}