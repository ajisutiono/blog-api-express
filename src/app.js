const express = require('express');
const cors = require('cors');

const postsRoute = require('./routes/postsRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/posts', postsRoute);

// error handler
app.use(errorHandler);

module.exports = app;
