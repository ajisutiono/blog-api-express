const express = require("express");

// import factory
// posts
const postsModel = require("../models/postsModel");
const createPostsService = require("../services/postsService");
const createPostsController = require("../controllers/postsController");

// validator s
const {
  createPostValidator,
  updatePostValidator,
} = require("../validators/postsValidator");

//middlewares
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

// dependecies posts
const postsService = createPostsService(postsModel);
const postsController = createPostsController(postsService);

router.post(
  "/",
  [createPostValidator, validateRequest],
  postsController.createPost
);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.put(
  "/:id",
  [updatePostValidator, validateRequest],
  postsController.editPost
);
router.delete("/:id", postsController.deletePost);

module.exports = router;
