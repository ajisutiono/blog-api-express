const express = require("express");

// import posts factory
const postsModel = require("../models/postsModel");
const createPostsService = require("../services/postsService");
const createPostsController = require("../controllers/postsController");

// validator
const { postValidator } = require("../validators/postsValidator");

//middlewares
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

// dependecies
const postsService = createPostsService(postsModel);
const postsController = createPostsController(postsService);

// routes
router.post("/", [postValidator, validateRequest], postsController.createPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.put("/:id", [postValidator, validateRequest], postsController.editPost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
