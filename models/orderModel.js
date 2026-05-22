const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./userModel");
const Food = require("./foodModal");

const Order = sequelize.define("Order", {
  foods: {
    type: DataTypes.JSON,
  },
  payment: {
    type: DataTypes.JSON,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "preparing",
  },
});

Order.belongsTo(User, { foreignKey: "buyerId" });
User.hasMany(Order, { foreignKey: "buyerId" });

module.exports = Order;
