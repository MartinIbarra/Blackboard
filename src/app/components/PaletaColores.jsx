import React from 'react'

const PaletaColores = (props) => {

    const changeColorEvent = (color) => {
        console.log('change color')
        props.user.emit('change-color', color)
    }

    return (
        <div className={`${props.active} paleta-colores`}>
            <span id="red" onClick={() => {
                    props.getColor("#FF0000") 
                    changeColorEvent("#FF0000") 
                } 
            }></span>
            <span id="blue" onClick={() => {
                    props.getColor("#0000FF") 
                    changeColorEvent("#0000FF")
                }
            }></span>
            <span id="yellow" onClick={() => {
                    props.getColor("#FFFF00")   
                    changeColorEvent("#FFFF00")
                } 
            }></span>
            <span id="green" onClick={() => {
                    props.getColor("#00FF00")
                    changeColorEvent("#00FF00")
                } 
            }></span>
            <span id="black" onClick={() => {
                    props.getColor("#000000")
                    changeColorEvent("#000000")
                }
            }></span>
        </div>
    )
}

export default PaletaColores