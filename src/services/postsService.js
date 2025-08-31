const InvariantError = require("../exceptions/InvariantError");

const createPostsService = (postsModel) => {
  const create = async ({ title, tags, body }) => {
    const id = await postsModel.create({ title, tags, body });

    if (!id) {
      throw new InvariantError("Post failed to add");
    }

    return id;
  };

  const getAll = async () => await postsModel.findAll();

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

  return { create, getAll, getById, update, destroy };
};

module.exports = createPostsService;
