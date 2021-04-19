import React from 'react'

const ColorPalette = ({getColor, user}) => {

    const changeColorEvent = (color) => {
        // console.log('change color', color)
        getColor(color)
        user.emit('change-color', color)
    }

    return (
        <div className='paleta-colores'>
            <span id="red" onClick={() => {
                    getColor("#FF0000")
                    changeColorEvent("#FF0000")
                } 
            }></span>
            <span id="blue" onClick={() => {
                    getColor("#0000FF")
                    changeColorEvent("#0000FF")
                }
            }></span>
            <span id="yellow" onClick={() => {
                    getColor("#FFFF00")   
                    changeColorEvent("#FFFF00")
                } 
            }></span>
            <span id="green" onClick={() => {
                    getColor("#00FF00")
                    changeColorEvent("#00FF00")
                } 
            }></span>
            <span id="black" onClick={() => {
                    getColor("#000000")
                    changeColorEvent("#000000")
                }
            }></span>
        </div>
    )
}

export default ColorPalette
