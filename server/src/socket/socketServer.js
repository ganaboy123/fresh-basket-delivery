const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config/env');

let io;

const parseToken = (socket) => {
  const authToken = socket.handshake.auth?.token;
  if (authToken) return authToken;

  const header = socket.handshake.headers?.authorization;
  if (header && header.startsWith('Bearer ')) {
    return header.split(' ')[1];
  }

  return null;
};

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: config.clientUrl,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = parseToken(socket);
      if (!token) {
        return next(new Error('Unauthorized: token missing'));
      }

      const decoded = jwt.verify(token, config.jwtSecret);
      socket.user = { id: decoded.id, role: decoded.role };
      return next();
    } catch (error) {
      return next(new Error('Unauthorized: invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = String(socket.user.id);
    socket.join(`user:${userId}`);

    if (socket.user.role === 'admin') {
      socket.join('admins');
    }

    socket.emit('socket:connected', {
      userId,
      role: socket.user.role,
      connectedAt: new Date().toISOString(),
    });
  });

  return io;
};

const emitOrderCreated = (order) => {
  if (!io) return;

  const orderId = String(order._id);
  const userId = String(order.userId);
  const payload = {
    orderId,
    userId,
    status: order.status,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,
  };

  io.to('admins').emit('order:created', payload);
  io.to(`user:${userId}`).emit('order:created', payload);
};

const emitOrderStatusUpdated = (order) => {
  if (!io) return;

  const orderId = String(order._id);
  const userId = String(order.userId);
  const latestHistory = order.statusHistory[order.statusHistory.length - 1];

  const payload = {
    orderId,
    userId,
    status: order.status,
    latestHistory,
    updatedAt: order.updatedAt,
  };

  io.to('admins').emit('order:status-updated', payload);
  io.to(`user:${userId}`).emit('order:status-updated', payload);
};

module.exports = {
  initializeSocket,
  emitOrderCreated,
  emitOrderStatusUpdated,
};
