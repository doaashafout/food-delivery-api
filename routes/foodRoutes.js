const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { validate } = require("../middlewares/validationMiddleware");
const { redisRateLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  validate("createFood"),
  createFoodController
);

router.get("/getAll", redisRateLimiter(20, 60000), getAllFoodsController);

router.get("/get/:id", getSingleFoodController);

router.get("/getByResturant/:id", getFoodByResturantController);

router.put("/update/:id", authMiddleware, updateFoodController);

router.delete("/delete/:id", authMiddleware, deleteFoodController);

router.post("/placeorder", authMiddleware, placeOrderController);

router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
