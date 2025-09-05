const express = require("express");

// import posts factory
const postsModel = require("../models/postsModel");
const createPostsService = require("../services/postsService");
const createPostsController = require("../controllers/postsController");

// validator
const { postValidator } = require("../validators/postsValidator");

//middlewares
const validateRequest = require("../middlewares/validateRequest");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// dependecies
const postsService = createPostsService(postsModel);
const postsController = createPostsController(postsService);

// routes
router.post("/", [authenticateToken, postValidator, validateRequest], postsController.createPost);
router.get("/", authenticateToken, postsController.getAllPosts);
router.get("/:id", authenticateToken, postsController.getPostById);
router.put("/:id", [authenticateToken, postValidator, validateRequest], postsController.editPost);
router.delete("/:id", authenticateToken, postsController.deletePost);

module.exports = router;
