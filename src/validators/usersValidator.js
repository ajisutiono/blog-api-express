const { body } = require("express-validator");

const userValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 50 })
    .withMessage("Username cannot be longer than 50 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Email cannot be longer than 255 characters"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("fullname")
    .isString()
    .withMessage("Fullname must be a string")
    .notEmpty()
    .withMessage("Fullname is required"),
];

module.exports = { userValidator };
