const NotFoundError = require("../exceptions/NotFoundError");
const catchAsync = require("../utils/catchAsync");

const createUsersController = (usersService) => {
  const createUser = catchAsync(async (req, res) => {
    const { username, email, password, fullname } = req.body;

    const userId = await usersService.createNewUser({
      username,
      email,
      password,
      fullname,
    });

    res.status(201).json({
      status: "success",
      message: "User has been created successfully",
      data: {
        userId,
      },
    });
  });

  const getUserById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return res.json({
      status: "success",
      data: {
        user,
      },
    });
  });

  return { createUser, getUserById };
};

module.exports = createUsersController;
