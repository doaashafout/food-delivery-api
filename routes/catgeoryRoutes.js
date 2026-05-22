const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");
const { validate } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  validate("createCategory"),
  createCatController
);

router.get("/getAll", getAllCatController);

router.put("/update/:id", authMiddleware, updateCatController);

router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;
