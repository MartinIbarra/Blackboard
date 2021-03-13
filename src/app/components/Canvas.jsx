import React, { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import PaletaColores from './PaletaColores'
let color

const Canvas = () => {

    const [state, setCanvasState] = useState({canv: "no-active", board: "active"})

    const canvasRef = useRef(null)
    const paletaColoresRef = useRef(null)
    const borradorRef = useRef(null)
    const penRef = useRef(null)
    const socket = io()

    const getColor = (param) => {
        color = param
    }

    useEffect(() => {
        const canv = canvasRef.current
        const ctx = canv.getContext('2d')
        const roomName = window.location.href.split('/')[4]

        let pen = true
        let borrador = false

        let dibujando = false
        let borrando = false

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

        borradorRef.current.addEventListener('click', () => {
            pen = false
            borrador = true
        }, false)

        penRef.current.addEventListener('click', () => {
            pen = true
            borrador = false
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
            dibujando = false
            borrando = false
        })

        canv.addEventListener('mousemove', (e) => {
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

            socket.emit('drawing', {oldCoord, coordenadas, roomName, color})
            
            ctx.lineTo(coordenadas.x , coordenadas.y)
            ctx.stroke()
        }

        function borrar(e){
            let pos = obtenerPosicion(e)
            ctx.clearRect(pos.x - 50, pos.y - 50, 100, 100)
            socket.emit('borrando', {pos})
        }

        function borrandoSocket(data){
            console.log('asdasdasdasda')
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

        socket.on('connect', () => console.log('conected'))
        socket.on('new user', data => console.log(data.msj))
        socket.on('drawing', data => {
            dibujandoSocket(data)
        })

        socket.on('borrando', data => {
            console.log('borrando socket')
            borrandoSocket(data)
        })

        socket.on('change-color', data => color = data)

    }, [])
    
    return (
        <div className="row jumbotron">
            <div className={state.canv === 'active' ? 'col-12' : 'col-6'}>
                <button onClick={() => setCanvasState({canv:"no-active", board: "active"})} type="button" className={`${state.canv} btn-close btn btn-outline-danger`}>Close</button>
                <div onClick={() => setCanvasState({canv:'active', board:'no-active'})} className={`${state.board} board`}>
        
                </div>
                <PaletaColores ref={paletaColoresRef} active={state.canv} getColor={getColor} user={socket}/>
                <span id="borrador" ref={borradorRef}></span>
                <span id="pen" ref={penRef}></span>
                <canvas id="canvas-1" className={state.canv} width='800' height='600' ref={canvasRef}>
                    Tu navegador no es compatible
                </canvas>
            </div>
        </div>
    )

}

export default Canvas