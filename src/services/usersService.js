const InvariantError = require("../exceptions/InvariantError");

const createUsersService = (usersModel) => {
  const createNewUser = async ({ username, email, password, fullname }) => {
    const verifyUsernameExists = await usersModel.verifyNewUsername(username);
    if (verifyUsernameExists) {
      throw new InvariantError(
        "Failed to add user. Username is already exist."
      );
    }

    const emailExists = await usersModel.verifyNewEmail(email);
    if (emailExists) {
      throw new InvariantError("Failed to add user. Email already exist.");
    }

    const userId = await usersModel.createNewUser({
      username,
      email,
      password,
      fullname,
    });

    if (!userId) {
      throw new InvariantError("User failed to add.");
    }

    return userId;
  };

  const getUserById = async (userId) => await usersModel.findUserId(userId);

  return { createNewUser, getUserById };
};

module.exports = createUsersService;
