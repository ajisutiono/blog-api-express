const express = require('express');
const cors = require('cors');

const postsRoute = require('./routes/postsRoute');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/posts', postsRoute);

module.exports = app;
