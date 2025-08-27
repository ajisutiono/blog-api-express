const express = require('express');
const router = express.Router();
const postsController = require('../controllers/PostsController');

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPost);
router.get('/:id', postsController.getPostById);
router.patch('/:id', postsController.editPost);
router.delete('/:id', postsController.deletePost);

module.exports = router;