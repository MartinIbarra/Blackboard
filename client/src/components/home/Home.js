import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import RoomList from './RoomList'

let socket

const Home = () => {
    let url
    process.env.NODE_ENV === 'production'
        ? url = process.env.REACT_APP_API_URL_PROD
        : url = process.env.REACT_APP_API_URL
    const ENDPOINT = `${url}`
    const { user, setUser } = useContext(UserContext)
    const [ room, setRoom ] = useState('')
    const [ rooms, setRooms ] = useState([])
    const [ roomError, setRoomError ] = useState('')
    const [ isRoomCreated, setIsRoomCreatedState ] = useState(false)
    const [ roomObject, setRoomObject ] = useState({_id:'', name:''})

    useEffect(() => {
        socket = io(ENDPOINT)
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT])

    useEffect(()=>{
        socket.on('output-rooms', rooms => {
            setRooms(rooms)
        })
    }, [])
    useEffect(() => {
        socket.on('room-created', room => {
            setRooms([...rooms, room])
            setRoomObject({_id:room._id, name: room.name})
            setIsRoomCreatedState(true)
        })
    }, [])

    useEffect(()=>{
        socket.on('error-room-exist', err => {
            setRoomError('this room already exist')
        })
    })

    const createRoom = e => {
        e.preventDefault()
        socket.emit('create-room', room)
        // setRoom('')
    }

    if(isRoomCreated){
        return <Redirect to={`/room/${roomObject._id}/${roomObject.name}`} />
    }

    if(!user){
        return <Redirect to="/login" />
    }

    return (
        <div className="container-fluid">
            <div className="jumbotron home-container mx-auto">
                <div className="row justify-content-between mx-auto w-100">
                    <div className="col-12 form-container mx-auto">
                        <div className="row content-rooms">

                            <div className="col-8">
                                <p className="saludo-usuario text-center">{`Hello, ${user.name}`}</p>
                                <form className="form-room" onSubmit={createRoom}>
                                    <input className="room-input" spellCheck="false" onChange={ e => { setRoom(e.target.value) }} onFocus={() => setRoomError('')} required type="text" placeholder="Room name" value={room} />
                                    <button className="create-btn btn btn-secondary"  type="submit">Create room</button>
                                    <span className="error-room">{roomError}</span>
                                </form>
                            </div>

                            <div className="col-4 room-list">
                                <h6>Room List</h6>
                                {
                                    rooms.length === 0 
                                    ? 'No hay salas disponibles'
                                    : <RoomList rooms={rooms}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home