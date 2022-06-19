const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat')
const leave = document.querySelector('.leave')
const roomName = document.querySelector('.room')
const userList = document.querySelector('#users')

const random = Math.ceil(Math.random() * 10)

// leave.addEventListener('click', () => {

// })

const username = random
const room = 'Python'

const socket = io()

//join Room
socket.emit('joinRoom', { username, room })

//Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

//Message from the  server
socket.on('message', (message) => {
  outPutMessage(message)

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const msg = e.target.elements.msg.value

  //Emit message to server
  socket.emit('chatMessage', msg)

  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

function outPutMessage(message) {
  const div = document.createElement('div')
  div.classList.add(
    `${
      message.username === username.toString()
        ? 'message-user'
        : 'message-other'
    }`
  )
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
              ${message.text}
            </p>`
  document.querySelector('.chat').appendChild(div)
}

//Add roomName to DOM
function outputRoomName(room) {
  roomName.innerText = room
}

//Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `
}

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?')
  if (leaveRoom) {
    window.location = '../index.html'
  } else {
  }
})
