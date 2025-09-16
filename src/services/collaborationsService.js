const InvariantError = require("../exceptions/InvariantError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthorizationError = require("../exceptions/AuthorizationError");

const createCollaborationsService = (collaborationsModel) => {
  const createCollaborator = async (postId, userId) => {
    const collaboratorId = await collaborationsModel.create(postId, userId);

    if (!collaboratorId) {
      throw new InvariantError("Collaboration failed to add.");
    }

    return collaboratorId;
  };

  const deleteCollaborator = async (postId, userId) => {
    const collaboratorId = await collaborationsModel.delete(postId, userId);

    if (!collaboratorId) {
        throw new NotFoundError("Collaboration not found.");
    }

    return collaboratorId;
  };

  const verifyCollaborator = async (postId, userId) => {
    const collab = await collaborationsModel.verify(postId, userId);

    if (!collab) {
        throw new AuthorizationError("You are not authorized to access this resource.");
    }

    return true;
  };

  return { createCollaborator, deleteCollaborator, verifyCollaborator };
};

module.exports = createCollaborationsService;
