const amqp = require("amqplib");

let channel;

async function connectRabbitMQ(url) {
  if (channel) return channel;
  const connection = await amqp.connect(url);
  channel = await connection.createChannel();
  return channel;
}

module.exports = { connectRabbitMQ };
