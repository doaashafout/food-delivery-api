const Food = require("../models/foodModal");
const Order = require("../models/orderModel");

const createFoodController = async (req, res, next) => {
  try {
    const {
      title, description, price, imageUrl, foodTags, catgeory,
      code, isAvailabe, resturnat, rating,
    } = req.body;

    if (!title || !description || !price || !resturnat) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    const newFood = await Food.create({
      title, description, price, imageUrl, foodTags, catgeory,
      code, isAvailabe, resturnatId: resturnat, rating,
    });

    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFoodsController = async (req, res, next) => {
  try {
    const foods = await Food.findAll();
    if (!foods.length) {
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleFoodController = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await Food.findByPk(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    next(error);
  }
};

const getFoodByResturantController = async (req, res, next) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    const food = await Food.findAll({ where: { resturnatId: resturantId } });
    if (!food.length) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on resturant",
      food,
    });
  } catch (error) {
    next(error);
  }
};

const updateFoodController = async (req, res, next) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }

    const food = await Food.findByPk(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }

    const {
      title, description, price, imageUrl, foodTags, catgeory,
      code, isAvailabe, resturnat, rating,
    } = req.body;

    await Food.update(
      {
        title, description, price, imageUrl, foodTags, catgeory,
        code, isAvailabe, resturnatId: resturnat, rating,
      },
      { where: { id: foodID } }
    );

    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    next(error);
  }
};

const deleteFoodController = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await Food.findByPk(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await Food.destroy({ where: { id: foodId } });
    res.status(200).send({
      success: true,
      message: "Food Item Deleted",
    });
  } catch (error) {
    next(error);
  }
};

const placeOrderController = async (req, res, next) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payment method",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = await Order.create({
      foods: cart,
      payment: total,
      buyerId: req.body.id,
    });

    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    next(error);
  }
};

const orderStatusController = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    await Order.update({ status }, { where: { id: orderId } });
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
