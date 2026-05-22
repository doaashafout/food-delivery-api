const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");
const { validate } = require("../middlewares/validationMiddleware");
const createMiddleware = require("../middlewares/middlewareFactory");
const { authLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  validate("register"),
  createMiddleware({ logBody: true }),
  registerController
);

router.post(
  "/login",
  authLimiter,
  validate("login"),
  loginController
);

module.exports = router;
