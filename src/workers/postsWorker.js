require("dotenv").config();
const { connectRabbitMQ } = require("../config/rabbitmq");
const collaborationsModel = require("../models/collaborationsModel");
const createCollaborationsService = require("../services/collaborationsService");
const postsModel = require("../models/postsModel");
const createPostsService = require("../services/postsService");
const createMailService = require("../services/mailService");
const createListener = require("../listeners/listener");

async function init() {
  const collaborationsService = createCollaborationsService(collaborationsModel);
  const postsService = createPostsService(postsModel, collaborationsService);
  const mailService = createMailService({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  });

  const listener = createListener({ postsService, mailService });
  const channel = await connectRabbitMQ(process.env.RABBITMQ_SERVER);
  const queue = "export:posts";

  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, listener.listen, { noAck: true });

  console.log("Worker running. Listening on queue:", queue);
}

init();
