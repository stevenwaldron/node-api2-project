const express = require('express');
const PostsRouter = require('./PostsRouter')

const server = express()

server.use(express.json())

server.use('/api/posts', PostsRouter)



module.exports = server;