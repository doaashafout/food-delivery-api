const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = sequelize.define("Category", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue:
      "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
  },
});

module.exports = Category;
