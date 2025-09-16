require('dotenv').config();
const app = require('./app');
const { connectRabbitMQ } = require("./config/rabbitmq");

const HOST = process.env.HOST;
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const channel = await connectRabbitMQ(process.env.RABBITMQ_SERVER);
    const appWithDeps = app(channel);

    appWithDeps.listen(PORT, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();