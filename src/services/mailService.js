const nodemailer = require("nodemailer");

function createMailService({ host, port, user, pass }) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });

  async function sendEmail(targetEmail, content) {
    const message = {
      from: "Blog Api",
      to: targetEmail,
      subject: "Export Post",
      text: "Attached are the results of the post export",
      attachments: [
        {
          filename: "post.json",
          content,
        },
      ],
    };

    return transporter.sendMail(message);
  }

  return { sendEmail };
}

module.exports = createMailService;
