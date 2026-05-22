const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Resturant = require("./resturantModel");

const Food = sequelize.define("Food", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue:
      "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
  },
  foodTags: {
    type: DataTypes.STRING,
  },
  catgeory: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.STRING,
  },
  isAvailabe: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  ratingCount: {
    type: DataTypes.STRING,
  },
});

Food.belongsTo(Resturant, { foreignKey: "resturnatId" });
Resturant.hasMany(Food, { foreignKey: "resturnatId" });

module.exports = Food;
