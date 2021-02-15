import React, { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const Canvas = props => {

    const [state, setCanvasState] = useState({canv: "no-active", board: "active"})

    const canvasRef = useRef(null)
    
    useEffect(() => {
        const socket = io()

        const canv = canvasRef.current
        const ctx = canv.getContext('2d')
        const roomName = window.location.href.split('/')[4]

        let dibujando = false

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

        canv.addEventListener('mousedown', event => {
            dibujando = true
            obtenerPosicion(event)
        })

        canv.addEventListener('mouseup', () => {
            dibujando = false
        })

        canv.addEventListener('mousemove', dibujar, false)

        function dibujar(event){
            if (!dibujando) return

            ctx.beginPath()
            ctx.lineCap = 'round'
            ctx.strokeStyle = '#000000'
            ctx.moveTo(coordenadas.x, coordenadas.y)

            oldCoord.x = coordenadas.x
            oldCoord.y = coordenadas.y
            
            obtenerPosicion(event)

            socket.emit('drawing', {oldCoord, coordenadas, roomName})
            
            ctx.lineTo(coordenadas.x , coordenadas.y)
            ctx.stroke()

        }

        function dibujandoSocket(data){
            ctx.beginPath()
            ctx.lineCap = 'round'
            ctx.strokeStyle = '#000000'
            ctx.moveTo(data.oldCoord.x, data.oldCoord.y)
            ctx.lineTo(data.coordenadas.x, data.coordenadas.y)
            ctx.stroke()
        }

        socket.on('connect', () => console.log('conected'))
        socket.on('new user', data => console.log(data.msj))
        socket.on('drawing', data => {
            dibujandoSocket(data)
        })

    }, [])
    
    return (
        <div className="row jumbotron">
            <div className={state.canv === 'active' ? 'col-12' : 'col-6'}>
                <button onClick={() => setCanvasState({canv:"no-active", board: "active"})} type="button" className={`${state.canv} btn-close btn btn-outline-danger`}>Close</button>
                <div onClick={() => setCanvasState({canv:'active', board:'no-active'})} className={`${state.board} board`}>
        
                </div>
                <canvas id="canvas-1" className={state.canv} width='800' height='600' ref={canvasRef} {...props}>
                    Tu navegador no es compatible
                </canvas>
            </div> 
        </div>
    )

}

export default Canvas
