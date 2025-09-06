const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthorizationError = require("../exceptions/AuthorizationError");

const createPostsService = (postsModel) => {
  const create = async ({ title, tags, body, author }) => {
    const id = await postsModel.create({ title, tags, body, author });

    if (!id) {
      throw new InvariantError("Post failed to add");
    }

    return id;
  };

  const getAll = async (author) => {
    const post = await postsModel.findAll(author);
    return post;
  };

  const getById = async (id) => await postsModel.findById(id);

  const update = async (id, { title, tags, body }) => {
    const updated = await postsModel.update(id, { title, tags, body });

    if (!updated) {
      throw new InvariantError("Post failed to update");
    }

    return updated;
  };

  const destroy = async (id) => {
    const deleted = await postsModel.destroy(id);

    if (!deleted) {
      throw new InvariantError("Post failed to delete");
    }

    return deleted;
  };

  const verifyPostAuthor = async (id, author) => {
    const post = await postsModel.verifyPostAuthor(id);

    if (!post) {
      throw new NotFoundError("Post id not found");
    }

    if (post.author !== author) {
      throw new AuthorizationError(
        "You are not authorized to access this resource."
      );
    }

    return post;
  };

  return { create, getAll, getById, update, destroy, verifyPostAuthor };
};

module.exports = createPostsService;
