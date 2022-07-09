const userModel = require("../models/userModel");
const asynchandler=require('express-async-handler');
const generateToken = require("../utils/generateToken");


const registerUser=asynchandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const pic=req.file.filename;
    const userExist=await userModel.findOne({email});
    console.log(pic)
    if(userExist){
        res.status(400);
        throw new Error("User already exist")
    }
     const user=await userModel.create({
        name,email,password,pic
     })
     if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic
        })
     }else{
        res.status(400);
        throw new Error('Error Occured!')
     }
   
})
const loginUser=asynchandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(user && (await user.matchpassword(password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid Email or password!')
    }
})
module.exports={registerUser,loginUser};