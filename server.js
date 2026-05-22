const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const { apiLimiter } = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(loggerMiddleware);
app.use(apiLimiter);

app.use("/api/v1", require("./routes/index"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Food Server APP API BASE PROJECT</h1>");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
