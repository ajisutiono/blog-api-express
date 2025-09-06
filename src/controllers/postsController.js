const NotFoundError = require("../exceptions/NotFoundError");
const catchAsync = require("../utils/catchAsync");

const createPostsController = (postsService) => {
  const createPost = catchAsync(async (req, res) => {
    const { title, tags, body } = req.body;
    const { id: credentialId } = req.user;
    const id = await postsService.create({ title, tags, body, author: credentialId });

    res.status(201).json({
      status: "success",
      message: "Blog post has been created successfully",
      data: {
        postId: id,
      },
    });
  });

  const getAllPosts = catchAsync(async (req, res) => {
    const { id: credentialId } = req.user;
    const posts = await postsService.getAll(credentialId);
    res.json({
      status: "success",
      data: {
        posts,
      },
    });
  });

  const getPostById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await postsService.verifyPostAuthor(id, credentialId);
    const post = await postsService.getById(id);

    if (!post) {
      throw new NotFoundError("Post id not found");
    }

    return res.json({
      status: "success",
      data: {
        post,
      },
    });
  });

  const editPost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.body;
    const { id: credentialId } = req.user;

    await postsService.verifyPostAuthor(id, credentialId);

    const updated = await postsService.update(id, { title, tags, body });

    if (!updated) {
      throw new NotFoundError("Post id not found");
    }

    return res.json({
      status: "success",
      message: "Post changed successfully",
    });
  });

  const deletePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { id: credentialId } = req.user;

    await postsService.verifyPostAuthor(id, credentialId);

    const deleted = await postsService.destroy(id);

    if (!deleted) {
      throw new NotFoundError("Post id not found");
    }

    return res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  });

  return { createPost, getAllPosts, getPostById, editPost, deletePost };
};

module.exports = createPostsController;
