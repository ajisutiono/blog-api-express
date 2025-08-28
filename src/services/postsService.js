const { nanoid } = require("nanoid");

const createPostsService = (postsModel) => {
  const create = ({ title, tags, body }) => {
    const id = nanoid(16);
    const created_at = new Date().toDateString();
    const updated_at = created_at;

    const newPost = { id, title, tags, body, created_at, updated_at };
    postsModel.push(newPost);

    return id;
  };

  const getAll = () => postsModel;

  const getById = (id) => postsModel.find((post) => post.id === id);

  const update = (id, { title, tags, body }) => {
    const index = postsModel.findIndex((post) => post.id === id);
    const updated_at = new Date().toTimeString();

    if (index !== -1) {
      postsModel[index] = {
        ...postsModel[index],
        title,
        tags,
        body,
        updated_at,
      };
      return true;
    }

    return false;
  };

  const destroy = (id) => {
    const index = postsModel.findIndex((post) => post.id === id);

    if (index !== -1) {
      postsModel.splice(index, 1);
      return true;
    }

    return false;
  };

  return { create, getAll, getById, update, destroy };
};

module.exports = createPostsService;
