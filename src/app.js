const express = require("express");
const cors = require("cors");

const postsRoute = require("./routes/postsRoute");
const usersRoute = require("./routes/usersRoute");
const authsRoute = require("./routes/authenticationsRoute");
const collabsRoute = require("./routes/collaborationsRoute");
const createExportRoute = require("./routes/exportRoute");
const errorHandler = require("./middlewares/errorHandler");

function createApp(channel) {
  const app = express();

  // middleware
  app.use(cors());
  app.use(express.json());

  // routes
  app.use("/posts", postsRoute);
  app.use("/users", usersRoute);
  app.use("/authentications", authsRoute);
  app.use("/collaborations", collabsRoute);
  app.use("/export", createExportRoute(channel)); // inject channel to route

  // error handler
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
