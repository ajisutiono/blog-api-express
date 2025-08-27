const { nanoid } = require("nanoid");
const posts = require("../models/PostsModel");

const createPost = (req, res) => {
  const { title, tags, body } = req.body;
  const id = nanoid(16);
  const created_at = new Date().toDateString();
  const updated_at = created_at;

  const newPost = {
    id,
    title,
    tags,
    body,
    created_at,
    updated_at,
  };

  posts.push(newPost);

  const isSuccess = posts.some((post) => post.id === id);

  if (isSuccess) {
    return res.status(201).json({
      status: "success",
      message: "Blog post has been created successfully",
      data: {
        postId: id,
      },
    });
  }
};

const getAllPost = (req, res) => {
  res.json({
    status: "success",
    data: {
      posts,
    },
  });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  const post = posts.filter((post) => (post.id === id))[0];

  if (post) {
    return res.json({
      status: "success",
      data: {
        post,
      },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Post Id not found",
  });
};

const editPost = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updated_at = new Date().toDateString();

  const index = posts.findIndex((n) => n.id === id);

  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      id,
      title,
      tags,
      body,
      updated_at,
    };

    return res.json({
      status: "success",
      message: "post changed successfully"
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Post id not found",
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  const index = posts.findIndex((n) => n.id === id);

  if (index !== -1) {
    posts.splice(index, 1);

    return res.json({
      status: "success",
      message: "Post deleted successfully"
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Post id not found",
  });
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  editPost,
  deletePost,
};
