const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env');
const { initializeSocket } = require('./socket/socketServer');

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  initializeSocket(server);

  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

startServer();
