const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    const exisiting = await User.findOne({ where: { email } });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered please Login",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userData = user.toJSON();
    delete userData.password;

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController };
