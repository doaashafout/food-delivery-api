const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const userData = user.toJSON();
    delete userData.password;
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updatePasswordController = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New Password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const user = await User.findOne({ where: { email, answer } });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invalid answer",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteProfileController = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
