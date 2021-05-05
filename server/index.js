const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const authRoutes = require('./routes/routes')
const dotenv = require('dotenv')

dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECT_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}). catch(err=>{
    console.log(err)
})

let api_endpoint

process.env.NODE_ENV === 'production'
? api_endpoint = process.env.API_URL_PROD
: api_endpoint = process.env.API_URL_DEV

const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = {
    origin: api_endpoint,
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)

app.set('port', process.env.PORT || 5000)

const Room = require('./models/Room')
const { addUser, getUser, removeUser } = require('./helpers/userHelper')
const { createRoom, deleteRoom } = require('./helpers/roomHelper')

app.get('/', (req, res) =>{
    res.send('Blackboard app')
})

app.get('/set-cookie', (req, res) => {
    res.cookie('isAuthenticated', true, {httpOnly:true, maxAge: 24*60*60*1000})
    res.send('cookies are set')
})

app.get('/get-cookie', (req, res) => {
    const cookies = req.cookies
    // console.log(cookies)
    res.json(cookies)
})

io.on('connection', socket =>{
    
    Room.find().then(res => {
        socket.emit('output-rooms', res)
    })

    socket.on('create-room', name => {
        createRoom(name, (err, room) =>{
            if(err){
                socket.emit('error-room-exist', err)
            } else {
                room.save().then(result => {
                    io.emit('room-created', result)
                    console.log('created room', name)
                })
            }
        })
    })

    socket.on('leave-room', room =>{
        deleteRoom(room, (err, roomInfo) => {
            if(err){
                console.log(err)
            }
            console.log('room deleted', roomInfo)
        })
    })

    socket.on('join', ({name, room_id, user_id, room_name}) => {
        const {error, user} = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id)
        io.to(room_id).emit('new user')
        if(error){
            console.log('join error', error)
        } else {
            console.log('join user', user)
        }
    })

    socket.on('dibujando-socket', data => {
        io.to(data.room_id).emit('dibujando-socket', data)
    })

    socket.on('change-color', data => io.to(data.room_id).emit('change-color', data))

    socket.on('borrando', data => {
        io.to(data.room_id).emit('borrando', data)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
    })
})

server.listen(app.get('port'), () => console.log(`server listening on port ${app.get('port')}`))