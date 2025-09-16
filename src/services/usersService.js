const InvariantError = require("../exceptions/InvariantError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const bcrypt = require("bcrypt");

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

  const verifyUserCredential = async (email, password) => {
    const user = await usersModel.verifyCredential(email);

    if (!user) {
      throw new AuthenticationError(
        "The credentials you provided are invalid."
      );
    }

    const { id, password: hashedPassword } = user;

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError(
        "The credentials you provided are invalid."
      );
    }
    return id;
  };

  const searchUsername = async (username) => await usersModel.findUsername(username);

  return { createNewUser, getUserById, verifyUserCredential, searchUsername };
};

module.exports = createUsersService;
