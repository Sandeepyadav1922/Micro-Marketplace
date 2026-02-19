require("dotenv").config();
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const { status } = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(status.FOUND, "User already exits");
  }
  const hashedPasswod = await bcrypt.hash(password, 10);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPasswod,
  });
  await newUser.save();
  return res.status(status.CREATED).json({ message: "User Registered" });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ExpressError(status[400], "Please Provide valid Credentials");
  }
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    throw new ExpressError(status.NOT_FOUND, "Invailid Email or Password");
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if(!isEqual) {
      throw new ExpressError(status.NOT_FOUND, "Invailid Email or Password");
  }
    let token = jwt.sign(
      {
      userId: user._id,
      name: user.name,
      email: user.email
    },
      process.env.JWT_SECRET_KEY,
      {expiresIn: "7d"}
    );
    return res.status(status.OK).json({
      message: "Yor are logged in",
      token: token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  };
// };

module.exports.authenticate = async (req, res) => {
  let token = req.headers.authorization;
  if(token) {
  res.status(status.OK).json({currUser: req.user});
}
};
