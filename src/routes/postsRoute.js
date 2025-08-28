const express = require('express');

// import factory
// posts
const postsModel = require('../models/postsModel');
const createPostsService = require('../services/postsService');
const createPostsController = require('../controllers/postsController');

const router = express.Router();

// dependecies posts
const postsService = createPostsService(postsModel);
const postsController = createPostsController(postsService);

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPost);
router.get('/:id', postsController.getPostById);
router.patch('/:id', postsController.editPost);
router.delete('/:id', postsController.deletePost);

module.exports = router;