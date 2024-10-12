const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

app.use(express.static('public'))

const server = http.createServer(app)
const{Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado')
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    })
    socket.on('chat', (msg) => {
        console.log('Mensaje: ' + msg)
        io.emit('chat', msg)
    })
})

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/chat_view.html`)
})

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})