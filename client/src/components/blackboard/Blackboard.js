import React, { useRef, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import ColorPalette from './ColorPalette'
import { UserContext } from '../../UserContext'

let socket

const Blackboard = () => {
    const ENDPOINT = 'https://blackboard-application.herokuapp.com/'
    const borradorRef = useRef(null)
    const penRef = useRef(null)
    // const [ color, setColor ] = useState('#000000')
    let color = '#000000'
    const canvasRef = useRef(null)
    const { user, setUser } = useContext(UserContext)
    let { room_id, room_name } = useParams()
    socket = io(ENDPOINT)

    const getColor = (param) => {
        // setColor(param)
        color = param
        console.log('color value ', color)
    }

    useEffect(() =>{
        const canv = canvasRef.current
        const ctx = canv.getContext('2d')
        canv.width = window.innerWidth
        canv.height = window.innerHeight
        let dibujando = false
        let borrando = false
        let pen = true
        let borrador = false
        
        socket.emit('join', {name: user.name, room_id, user_id:user._id, room_name})

        let coordenadas = {
            x: 0,
            y: 0
        }
        let oldCoord = {
            x: 0,
            y: 0
        }
        ctx.lineWidth = 1

        function obtenerPosicion(e){
            let rect = canv.getBoundingClientRect()
            coordenadas.x = (e.clientX - rect.left)
            coordenadas.y = (e.clientY - rect.top)
            return coordenadas
        }

        borradorRef.current.addEventListener('click', event => {
            borrador = true
            pen = false
        }, false)

        penRef.current.addEventListener('click', event => {
            borrador = false
            pen = true
        }, false)

        canv.addEventListener('mousedown', event => {
            if(pen){
                dibujando = true
            } else if(borrador){
                borrando = true
            }
            obtenerPosicion(event)
        })

        canv.addEventListener('mouseup', () => {
            borrando = false
            dibujando = false
        })

        canv.addEventListener('mousemove', e => {
            if(pen && dibujando){
                dibujar(e)
            } else if(borrador && borrando){
                borrar(e)
            }
        }, false)

        function dibujar(event){
            ctx.beginPath()
            ctx.lineCap = 'round'
            ctx.strokeStyle = !color ? '#000000' : color
            ctx.moveTo(coordenadas.x, coordenadas.y)

            oldCoord.x = coordenadas.x
            oldCoord.y = coordenadas.y

            obtenerPosicion(event)

            socket.emit('dibujando-socket', {oldCoord, coordenadas, room_id, color})
            
            ctx.lineTo(coordenadas.x , coordenadas.y)
            ctx.stroke()
        }

        function borrar(e){
            let pos = obtenerPosicion(e)
            socket.emit('borrando', {pos, room_id})
            ctx.clearRect(pos.x - 50, pos.y - 50, 100, 100)
        }

        function borrandoSocket(data){
            ctx.clearRect(data.pos.x - 50, data.pos.y - 50, 100, 100)
        }

        function dibujandoSocket(data){
            ctx.beginPath()
            ctx.lineCap = 'round'
            ctx.strokeStyle = !data.color ? '#000000' : data.color
            ctx.moveTo(data.oldCoord.x, data.oldCoord.y)
            ctx.lineTo(data.coordenadas.x, data.coordenadas.y)
            ctx.stroke()
        }

        socket.on('dibujando-socket', data => {
            dibujandoSocket(data)
        })

        socket.on('borrando', data => {
            borrandoSocket(data)
        })

        socket.on('change-color', data => {
            color = data
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row jumbotron">
                <ColorPalette getColor={getColor} user={socket}/>
                <div className="col-6">
                    <span id="borrador" ref={borradorRef}>
                        <i className="bi bi-eraser"></i>
                    </span>
                    <span id="pen" ref={penRef}>
                        <i className="bi bi-pencil"></i>
                    </span>
                </div>
                <canvas className="col-12" id="canvas" ref={canvasRef}>
                    Tu navegador no es compatible
                </canvas>
            </div>
        </div>
    )
}

export default Blackboard
