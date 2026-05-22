const Joi = require("joi");

const schemas = {
  register: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    address: Joi.any(),
    answer: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  createResturant: Joi.object({
    title: Joi.string().required(),
    coords: Joi.object({
      id: Joi.string(),
      latitude: Joi.any(),
      latitudeDelta: Joi.any(),
      longitude: Joi.any(),
      longitudeDelta: Joi.any(),
      address: Joi.string(),
      title: Joi.string(),
    }).required(),
    imageUrl: Joi.string(),
    foods: Joi.any(),
    time: Joi.string(),
    pickup: Joi.boolean(),
    delivery: Joi.boolean(),
    isOpen: Joi.boolean(),
    logoUrl: Joi.string(),
    rating: Joi.number(),
    ratingCount: Joi.string(),
    code: Joi.string(),
  }),
  createFood: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    resturnat: Joi.any(),
    imageUrl: Joi.string(),
    foodTags: Joi.string(),
    catgeory: Joi.string(),
    code: Joi.string(),
    isAvailabe: Joi.boolean(),
    rating: Joi.number(),
  }),
  createCategory: Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string(),
  }),
};

const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) return next();

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((d) => d.message).join(", ");
      return res.status(400).send({
        success: false,
        message: messages,
      });
    }
    next();
  };
};

module.exports = { validate, schemas };
