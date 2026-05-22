const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Resturant = sequelize.define("Resturant", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  foods: {
    type: DataTypes.JSON,
  },
  time: {
    type: DataTypes.STRING,
  },
  pickup: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  delivery: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  logoUrl: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  ratingCount: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.STRING,
  },
  coords: {
    type: DataTypes.JSON,
  },
});

module.exports = Resturant;
