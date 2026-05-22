const express = require("express");
const router = express.Router();


router.use("/auth", require("./authRoutes"));
router.use("/user", require("./userRoutes"));
router.use("/resturant", require("./resturantRoutes"));
router.use("/category", require("./catgeoryRoutes"));
router.use("/food", require("./foodRoutes"));

module.exports = router;
