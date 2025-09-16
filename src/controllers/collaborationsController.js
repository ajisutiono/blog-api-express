const catchAsync = require("../utils/catchAsync");

const createCollaborationsController = (postsService, collaborationsService) => {
  const createCollaborator = catchAsync(async (req, res) => {
    const { id: author } = req.user;
    const { postId, userId } = req.body;

    await postsService.verifyPostAuthor(postId, author);
    const collaborationId = await collaborationsService.createCollaborator(
      postId,
      userId
    );

    res.status(201).json({
      status: "success",
      message: "Collaboration successfully added.",
      data: {
        collaborationId,
      },
    });
  });

  const deleteCollaborator = catchAsync(async (req, res) => {
    const { id: author } = req.user;
    const { postId, userId } = req.body;

    await postsService.verifyPostAuthor(postId, author);
    await collaborationsService.deleteCollaborator(postId, userId);

    res.json({
      status: "success",
      message: "Collaboration successfully deleted.",
    });
  });

  return { createCollaborator, deleteCollaborator };
};

module.exports = createCollaborationsController;
