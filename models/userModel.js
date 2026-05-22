const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usertype: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "clinet",
  },
  profile: {
    type: DataTypes.STRING,
    defaultValue:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
