const { body } = require("express-validator");

const exportPostsValidator = [
  body("targetEmail")
    .notEmpty().withMessage("targetEmail is required")
    .isEmail().withMessage("targetEmail must be a valid email address"),
];

module.exports = { exportPostsValidator };
