const Category = require("../models/categoryModel");

const createCatController = async (req, res, next) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
      });
    }
    const newCategory = await Category.create({ title, imageUrl });
    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCatController = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    if (!categories.length) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCatController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    await Category.update({ title, imageUrl }, { where: { id } });
    const updatedCategory = await Category.findByPk(id);

    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCatController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category Found With this id",
      });
    }
    await Category.destroy({ where: { id } });
    res.status(200).send({
      success: true,
      message: "category Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
