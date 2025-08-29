const { validationResult } = require("express-validator");
const InvariantError = require("../exceptions/InvariantError");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new InvariantError(errors.array()[0].msg);
  }

  next();
};

module.exports = validateRequest;
