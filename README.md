# Chat App

This is a chat app thet has been implemented using socket.io. Socket io implements websockets to ensure that it keeps an open communication between the server and the client.

## App Features

- send messages after login
- Notify all users in a room after a user joun a room
- user can communicate with other users in a room
- All users in a room notified when a user leaves a room

## Limitations

1. The app aly allows users to join a certain number of rooms
2. The data is stored in an array hence can only be accessed when the user logs into the app. Database access features can be added to the app.

![chat App](https://github.com/Muiruriscode/Socket-io-Chat-App/blob/main/public/chat.png)

## Express setup

Install express

```bash
mpm install express
```

### server.js

Express setup

```js
const path = require('path')
const http = require('http')
const express = require('express')

const server = http.createServer(app)

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server is listening on port ${port}...`))
```

### Access static folder

Access the public folder in the app

```js
app.use(express.static(path.join(__dirname, 'public')))
```

## Intergrating socket.io

Install socket.io

```js
npm install socket.io
```

Importing to express

```js
const socketio = require('socket.io')
const io = socketio(server)
```

To start a connection

```js
io.on('connection', (socket) => {})
```

## Server side

### Send Message

#### Socket.emit()

To send a message to the client. Sends message the client only

```js
socket.emit('message', formatMessage(bot, 'Welcome to the chat app'))
```

#### Socket.braodcast.emit()

Sends the message to the all the have joined except the current user

```js
socket.broadcast.emit(
  'message',
  formatMessage(bot, `${user.username} has joined the chat`)
)
```

#### io.emit()

Sends Message to all users theat are in the current connection

```js
io.emit()
```

### Join a room

To join a room use

```js
socket.join(roomName)
```

#### Broadcast Message to a room

```js
socket.broadcast
  .to(user.room)
  .emit('message', formatMessage(bot, `${user.username} has joined the chat`))
```

### On client diconnect

```js
socket.on('disconnect', () => {})
```

## Client

Add script tags to htm

```html
<script src="/socket.io/socket.io.js"></script>
```

### Receive Message

To receive message fom the server

```js
socket.on('message', (message) => {
  outPutMessage(message)
})
```
