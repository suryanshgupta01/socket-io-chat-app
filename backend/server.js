const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(cors())
env = require('dotenv').config()
const io = socketIO(server)
const port = process.env.PORT || 4000;

const users = new Map()

io.on("connection", (socket) => {
    socket.on('joined', ({ name }) => {
        // users[socket.id] = name
        users.set(socket.id, name)
        //emit matlab sirf ussi ko jayega
        socket.emit('welcome', { user: "Admin", msg: `welcome to chat ${users.get(socket.id)} ` })
        //broadczast matlab usko chhoke sabko jayega
        socket.broadcast.emit('UserJoined', { user: "Admin", msg: `${users.get(socket.id)} has joined the chat` })
    })
    socket.on('message', ({ id, msg }) => {
        io.emit('sendMsg', { user: users.get(id), msg })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('userleft', { user: "Admin", msg: `${users.get(socket.id)} has left the chat` })

        if (users.has(socket.id))
            users.delete(socket.id)
        socket.disconnect();
        // Clean up the socket connection on component unmount
    });
})

server.listen(port, () => { console.log("listening at port", port) })