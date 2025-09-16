const catchAsync = require("../utils/catchAsync");

function createExportController(channel) {
  const queue = "export:posts";

  const exportPosts = catchAsync(async (req, res) => {
    const { userId, targetEmail } = req.body;

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify({ userId, targetEmail }))
    );

    res.status(201).json({ 
        status: "success", 
        message: "Export request queued" });
  });

  return { exportPosts };
}

module.exports = createExportController;
