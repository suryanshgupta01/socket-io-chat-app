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

const users = [{}]

io.on("connection", (socket) => {
    socket.on('joined', ({ name }) => {
        users[socket.id] = name
        // console.log(name, " has joined")
        //emit matlab sirf ussi ko jayega
        socket.emit('welcome', { user: "Admin", msg: `welcome to chat ${users[socket.id]} ` })
        //broadczast matlab usko chhoke sabko jayega
        socket.broadcast.emit('UserJoined', { user: "Admin", msg: `${users[socket.id]} has joined the chat` })
    })
    socket.on('message', ({ id, msg }) => {
        io.emit('sendMsg', { user: users[id], msg })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('userleft', { user: "Admin", msg: `${users[socket.id]} has left the chat` })

        // console.log(users[socket.id], "disconnected")
        socket.disconnect();
        // Clean up the socket connection on component unmount
    });
})


app.get('/', (req, res) => {
    res.send("RUNNING BOYS LETS GO")
})
server.listen(port, () => { console.log("listening at port", port) })