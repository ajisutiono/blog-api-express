const express = require("express");

// import factory
const usersModel = require('../models/usersModel');
const createUsersService = require('../services/usersService');
const createUsersController = require('../controllers/usersController');

// validator
const { userValidator } = require('../validators/usersValidator');

// middleware
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

// dependencies
const usersService = createUsersService(usersModel);
const usersController = createUsersController(usersService);

// routes
router.post('/', [userValidator, validateRequest], usersController.createUser);
router.get('/:id', usersController.getUserById);

module.exports = router;
