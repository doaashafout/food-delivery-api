const { Sequelize } = require("sequelize");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "food_app",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected To MySQL Database`.bgWhite);
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("DB Error", error);
  }
};

module.exports = { sequelize, connectDb };
