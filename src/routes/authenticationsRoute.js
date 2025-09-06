const express = require("express");

// factory
const authsModel = require("../models/authenticationsModel");
const usersModel = require("../models/usersModel");
const createAuthenticationsService = require("../services/authenticationsService");
const createAuthenticationsController = require("../controllers/authenticationsController");
const createUsersService = require("../services/usersService");
const tokenManager = require("../config/token");

// validator
const {
  PostAuthenticationValidator,
  PutAuthenticationValidator,
  DeleteAuthenticationValidator,
} = require("../validators/authenticationsValidator");

// middlware
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

// dependencies
const authsService = createAuthenticationsService(authsModel);
const usersService = createUsersService(usersModel);
const authsController = createAuthenticationsController(usersService, authsService, tokenManager);

// routes
router.post('/', [PostAuthenticationValidator, validateRequest], authsController.postAuthentication);
router.put('/', [PutAuthenticationValidator, validateRequest], authsController.putAuthentication);
router.delete('/', [DeleteAuthenticationValidator, validateRequest], authsController.deleteAuthentication);

module.exports = router;