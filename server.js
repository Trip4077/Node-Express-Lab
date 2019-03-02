const express = require('express');
const apiRoutes = require('./api/apiRoutes');
const postsRouter = require('./api/postsRouter');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter)

module.exports = server;