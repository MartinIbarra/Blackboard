const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const root = './public'

app.set('port', process.env.PORT || 8080)
app.use(express.static('./public'))

let roomsList = []
let roomName

//middleware auth room

app.get('/canvas/:roomName', (req, res) =>{
    roomName = req.params.roomName
    roomsList.push(roomName)
    res.sendFile('index.html', { root })
})

io.on('connection', socket =>{
    socket.join(roomName)
    io.to(roomName).emit('new user', {
        msg: 'new user connected'
    })

    socket.on('drawing', data => socket.to(data.roomName).emit('drawing', data))

    socket.on('change-color', data => socket.to(data.roomName).emit('change-color', data))

    socket.on('borrando', data => socket.to(data.roomName).emit('borrando', data))
})


server.listen(app.get('port'), () => console.log(`server listening on port ${app.get('port')}`))