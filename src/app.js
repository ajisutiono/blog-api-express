const express = require("express");
const cors = require("cors");

const postsRoute = require("./routes/postsRoute");
const usersRoute = require("./routes/usersRoute");
const authsRoute = require("./routes/authsRoute");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/authentications", authsRoute);

// error handler
app.use(errorHandler);

module.exports = app;
