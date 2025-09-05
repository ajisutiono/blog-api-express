const catchAsync = require("../utils/catchAsync");

const createAuthenticationsController = (
  usersService,
  authsService,
  tokenManager
) => {
  const postAuthentication = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const userId = await usersService.verifyUserCredential(email, password);

    const accessToken = tokenManager.generateAccessToken({ id: userId });
    const refreshToken = tokenManager.generateRefreshToken({ id: userId });

    await authsService.addRefreshToken(refreshToken);

    res.status(201).json({
      status: "success",
      message: "Authentication successfully added.",
      data: {
        accessToken,
        refreshToken,
      },
    });
  });

  const putAuthentication = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    await authsService.verifyRefreshToken(refreshToken);
    const { id } = tokenManager.verifyRefreshToken(refreshToken);

    const newAccessToken = tokenManager.generateAccessToken({ id });

    res.json({
      status: "success",
      message: "Access token successfully updated.",
      data: {
        accessToken: newAccessToken,
      },
    });
  });

  const deleteAuthentication = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    await authsService.verifyRefreshToken(refreshToken);
    await authsService.deleteRefreshToken(refreshToken);

    res.json({
      status: "success",
      message: "Refresh token successfully deleted.",
    });
  });

  return { postAuthentication, putAuthentication, deleteAuthentication };
};

module.exports = createAuthenticationsController;
