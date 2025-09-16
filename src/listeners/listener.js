function createListener({ postsService, mailService }) {
  async function listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      const posts = await postsService.getAll(userId);
      const result = await mailService.sendEmail(
        targetEmail,
        JSON.stringify(posts)
      );
      console.log("Email sent:", result.messageId);
    } catch (error) {
      console.log("Error in listener:", error);
    }
  }

  return { listen };
}

module.exports = createListener;
