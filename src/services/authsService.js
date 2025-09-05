const InvariantError = require("../exceptions/InvariantError");

const createAuthenticationsService = (authsModel) => {
  const addRefreshToken = async (token) => await authsModel.addRefreshToken(token);

  const verifyRefreshToken = async (token) => {
    const verifyRefreshValid = await authsModel.verifyRefreshToken(token);

    if (!verifyRefreshValid) {
      throw new InvariantError("Refresh token is invalid.");
    }
  };

  const deleteRefreshToken = async (token) =>
    await authsModel.deleteRefreshToken(token);

  return { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
};

module.exports = createAuthenticationsService;
