const express = require("express");

// import factory
const collaborationsModel = require("../models/collaborationsModel");
const postsModel = require("../models/postsModel");
const createCollaborationsService = require("../services/collaborationsService");
const createPostsService = require("../services/postsService");
const createCollaborationsController = require("../controllers/collaborationsController");

// validator
const {
  collaborationsValidator,
} = require("../validators/collaborationsValidator");

//middlewares
const validateRequest = require("../middlewares/validateRequest");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// dependecies
const collaborationsService = createCollaborationsService(collaborationsModel);
const postsService = createPostsService(postsModel, collaborationsService);
const collaborationsController = createCollaborationsController(
  postsService,
  collaborationsService
);

// routes
router.post(
  "/",
  [authenticateToken, collaborationsValidator, validateRequest],
  collaborationsController.createCollaborator
);
router.delete(
  "/",
  [authenticateToken, collaborationsValidator, validateRequest],
  collaborationsController.deleteCollaborator
);

module.exports = router;
