const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const bot = 'Chat Bot'

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)

    //send message only to the user
    socket.emit('message', formatMessage(bot, 'Welcome to the chat app'))

    //Braodcast except to the user
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(bot, `${user.username} has joined the chat`)
      )

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    })
  })

  socket.on('chatMessage', (message) => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('message', formatMessage(`${user.username}`, message))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.emit(
        'message',
        formatMessage(bot, `${user['0'].username} has left the chat`)
      )

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      })
    }
  })
})

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server is listening on port ${port}...`))
