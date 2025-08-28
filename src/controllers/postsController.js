const createPostsController = (postsService) => {
  const createPost = (req, res) => {
    const { title, tags, body } = req.body;
    const id = postsService.create({ title, tags, body });

    res.status(201).json({
      status: "success",
      message: "Blog post has been created successfully",
      data: {
        postId: id,
      },
    });
  };

  const getAllPost = (req, res) => {
    res.json({
      status: "success",
      data: {
        posts: postsService.getAll(),
      },
    });
  };

  const getPostById = (req, res) => {
    const { id } = req.params;
    const post = postsService.getById(id);

    if (post) {
      return res.json({
        status: "success",
        data: {
          post
        },
      });
    }

    return res.status(404).json({
      status: "fail",
      message: "Post id not found",
    });
  };

  const editPost = (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.body;

    const updated = postsService.update(id, { title, tags, body });

    if (updated) {
      return res.json({
        status: "success",
        message: "Post changed successfully",
      });
    }

    return res.status(404).json({
      status: "fail",
      message: "Post id not found",
    });
  };

  const deletePost = (req, res) => {
    const { id } = req.params;

    const deleted = postsService.destroy(id);

    if (deleted) {
      return res.json({
        status: "success",
        message: "Post deleted successfully",
      });
    }

    return res.status(404).json({
      status: "fail",
      message: "Post id not found",
    });
  };

  return { createPost, getAllPost, getPostById, editPost, deletePost };
};

module.exports = createPostsController;
