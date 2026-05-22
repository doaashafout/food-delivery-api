const Resturant = require("../models/resturantModel");

const createResturantController = async (req, res, next) => {
  try {
    const {
      title, imageUrl, foods, time, pickup, delivery, isOpen,
      logoUrl, rating, ratingCount, code, coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    await Resturant.create({
      title, imageUrl, foods, time, pickup, delivery, isOpen,
      logoUrl, rating, ratingCount, code, coords,
    });

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllResturantController = async (req, res, next) => {
  try {
    const resturants = await Resturant.findAll();
    if (!resturants.length) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    next(error);
  }
};

const getResturantByIdController = async (req, res, next) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturant ID",
      });
    }

    const resturant = await Resturant.findByPk(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    next(error);
  }
};

const deleteResturantController = async (req, res, next) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await Resturant.destroy({ where: { id: resturantId } });
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
