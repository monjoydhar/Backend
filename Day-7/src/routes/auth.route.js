const express = require("express");
const userModel = require("../models/user.model");
const JWT = require("jsonwebtoken");
const cypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  const hashedPassword = cypto.createHash("md5").update(password).digest("hex");

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = JWT.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  res.cookie('JWT_TOKEN', token)

  res
    .status(201)
    .json({ message: "User registered successfully", user, token });
});

authRouter.post("/protected", async (req, res) => {  
    console.log(req.cookies);
 }); 
 
 //auth/route/login

 authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = cypto.createHash("md5").update(password).digest("hex");
    if (user.password !== hashedPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.cookie('JWT_TOKEN', token)

    res.status(200).json({ message: "User logged in successfully", user, token });
  });         

module.exports = authRouter;
