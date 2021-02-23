import React, { useEffect, useState } from 'react'

const PaletaColores = (props) => {

    // let [color, setColor] = useState("#000000")

    // let { getColor } = props.getColor

    useEffect(() => {
        
    }, [])


    return (
        <div className={`${props.active} paleta-colores`}>
            <span id="red" onClick={() => props.getColor("#FF0000") }></span>
            <span id="blue" onClick={() => props.getColor("#0000FF") }></span>
            <span id="yellow" onClick={() => props.getColor("#FFFF00") }></span>
            <span id="green" onClick={() => props.getColor("#00FF00") }></span>
            <span id="black" onClick={() => props.getColor("#000000") }></span>
        </div>
    )
}

export default PaletaColores