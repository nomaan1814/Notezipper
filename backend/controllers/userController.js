const userModel = require("../models/userModel");
const asynchandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
var path = require("path");

const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  const pic = req.file.filename;
  const userExist = await userModel.findOne({ email });
  console.log(pic);
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await userModel.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await user.matchpassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password!");
  }
});
const userUpdateProfile = asynchandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user) {
    var profile_pic;
    if (req.file) {
      profile_pic = req.file.path;
    } else {
      profile_pic = user.pic;
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = profile_pic;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const image_retreive = asynchandler(async (req, res) => {
  let img = req.params.img;
  var publicDir = path.join(__dirname, "../public");
  res.sendFile(`${publicDir}/uploads/${img}`);
});
module.exports = { registerUser, loginUser, userUpdateProfile, image_retreive };
