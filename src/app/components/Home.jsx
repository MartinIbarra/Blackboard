import React, { useRef } from 'react'
import axios from 'axios'

const Home = () => {
    const roomHolderRef = useRef(null)
    const createRoomInput = useRef(null)
    const joinRoomInput = useRef(null)

    const createRoom = e => {
        e.preventDefault()

        axios.get(`/canvas/${createRoomInput.current.value}`)
            .then(res => window.location.href = `/canvas/${createRoomInput.current.value}`)
            .catch(err => console.log(err))
    }

    const joinRoom = e => {
        e.preventDefault()

        axios.get(`/canvas/${joinRoomInput.current.value}`)
            .then(res => window.location.href = `/canvas/${joinRoomInput.current.value}`)
            .catch(err => console.log(err))
    }

    return (
        <div className="jumbotron home-container">

                <div className="room_input_holder" ref={roomHolderRef}>
                    <form className="form-container" onSubmit={createRoom}>
                        <input className="room-input" required type="text" placeholder="Create Room" ref={createRoomInput} />
                        <button className="create-btn btn btn-primary"  type="submit">Create a room</button>
                    </form>

                    <form className="form-container" onSubmit={joinRoom}>
                        <input className="room-input" required type="text" placeholder="Join Room" ref={joinRoomInput} />
                        <button className="create-btn btn btn-primary" type="submit">Join room</button>
                    </form>
                </div>

        </div>
    )
}

export default Home
