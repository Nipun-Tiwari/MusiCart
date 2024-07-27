const AuthenticateUser = require('../middlewares/AuthenticateUser');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const router=express.Router();
const User=require('../models/User')

router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      res.send({ message: "user already exists, please sign in" });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUsers = {
        name,
        email,
        mobile,
        password: encryptedPassword,
      };
      User.create(newUsers).then(() => {
        const jwtToken=jwt.sign(newUsers,process.env.JWT_SECRET_KEY, {expiresIn:3600} )
        res.json({ status: "success", jwtToken, name: newUsers.name });
      });

    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/login',async (req, res)=>{
  
  try{
    const {email, password} = req.body;
    const userInDB=await User.findOne({email});
    if(!userInDB){
      res.send({message:'user not found in database. Please Sign up'});
      return
    }
    const existingUser=await bcrypt.compare(password, userInDB.password);
    if(existingUser){
      const jwtToken=jwt.sign(userInDB.toJSON(),process.env.JWT_SECRET_KEY, {expiresIn:3600} )
      res.send({message:"user exists, Signed in successfully",jwtToken, name: userInDB.name })
    }
    else{
      res.send({message:'invalid credentials'})
    }

  }
  catch(err){
    console.log(err)
    res.send({message:"FAILED"})
  }
  
})

module.exports=router



