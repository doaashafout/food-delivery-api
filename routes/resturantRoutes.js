const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");
const { validate } = require("../middlewares/validationMiddleware");
const { customRateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  validate("createResturant"),
  createResturantController
);

router.get("/getAll", customRateLimiter(10, 30000), getAllResturantController);

router.get("/get/:id", getResturantByIdController);

router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
