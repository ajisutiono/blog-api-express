const NotFoundError = require("../exceptions/NotFoundError");
const catchAsync = require("../utils/catchAsync");

const createPostsController = (postsService) => {
  const createPost = catchAsync(async (req, res) => {
    const { title, tags, body } = req.body;
    const id = await postsService.create({ title, tags, body });

    res.status(201).json({
      status: "success",
      message: "Blog post has been created successfully",
      data: {
        postId: id,
      },
    });
  });

  const getAllPosts = catchAsync(async (req, res) => {
    res.json({
      status: "success",
      data: {
        posts: await postsService.getAll(),
      },
    });
  });

  const getPostById = catchAsync(async (req, res) => {
    const { id } = req.params;
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
