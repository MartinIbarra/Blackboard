const Room = require('../models/Room')

const createRoom = async (roomName, callback) =>{
    let error
    let room
    try{
        room = await Room.create({name:roomName})
    }catch(err){
        error = err
        console.log('error al crear la sala', roomName)
    }
    callback(error, room)
}

const deleteRoom = async (roomName, callback) =>{
    // const index = users.findIndex(user => user.socket_id === socket_id)
    let room
    let error
    try{
        room = await Room.deleteOne({name: roomName})
    } catch (err){
        error = err
        console.log(error)
    }
    callback(error, room)
}

module.exports = { createRoom, deleteRoom }