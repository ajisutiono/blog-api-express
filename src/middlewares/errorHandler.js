const ClientError = require("../exceptions/ClientError");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

module.exports = errorHandler;
