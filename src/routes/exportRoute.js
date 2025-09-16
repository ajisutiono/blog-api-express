const express = require("express");

// import facotry
// const { connectRabbitMQ } = require("../config/rabbitmq");
const createExportController = require("../controllers/exportPostsController");

// validator
const { exportPostsValidator } = require("../validators/exportPostsValidator");

// middlewares
const validateRequest = require("../middlewares/validateRequest");
const authenticateToken = require("../middlewares/authenticateToken");

// const router = express.Router();

// dependecies
// const exportPostsController = createExportController(connectRabbitMQ);

// routes
// router.post(
//   "/posts",
//   [authenticateToken, exportPostsValidator, validateRequest],
//   exportPostsController.exportPosts
// );

// module.exports = router;

function createExportRoute(channel) {
  const router = express.Router();

  // dependencies
  const exportPostsController = createExportController(channel);

  // routes
  router.post(
    "/posts",
    [authenticateToken, exportPostsValidator, validateRequest],
    exportPostsController.exportPosts
  );

  return router;
}

module.exports = createExportRoute;
