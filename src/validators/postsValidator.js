const { body } = require("express-validator");

const basePostValidator = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),

  body("body")
    .isString()
    .withMessage("Body must be a string")
    .notEmpty()
    .withMessage("Body is required"),

  body("tags")
    .isArray()
    .withMessage("Tags must be an array")
    .custom((arr) => arr.every((tag) => typeof tag === "string"))
    .withMessage("Tags must be an array of strings"),
];

const createPostValidator = basePostValidator;

const updatePostValidator = basePostValidator;

module.exports = { createPostValidator, updatePostValidator };
