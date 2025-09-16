const { body } = require("express-validator");

const collaborationsValidator = [
  body("postId")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required"),
  body("userId")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required"),
];

module.exports = { collaborationsValidator };
