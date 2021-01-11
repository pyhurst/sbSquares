import React, { useEffect, useState } from "react";
import ReactCardFlip from 'react-card-flip'
import "./Square.css"

const Square = (props) => {
    // console.log(props)

    if (!props.active) {

        return (
            <>
                <ReactCardFlip isFlipped={props.isFlipped} flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedFrontToBack="1.5">
                    <div className="bg-warning text-center cardDimensions" id={props.id} data-value={props.data} onClick={props.flipFunciton}>

                    </div>

                    <div className="bg-info text-center justify-content-center cardDimensions" id={props.id} data-value={props.data} onClick={props.flipFunciton}>
                        Francis
                    </div>
                </ReactCardFlip>
            </>
        )
    } else {
        return (

            <ReactCardFlip isFlipped="false" flipDirection="horizontal" flipSpeedFrontToBack="1.5" flipSpeedFrontToBack="1.5">
                <div className={props.color} id={props.id}>
                    {props.name}
                </div>
                <div className={props.color} id={props.id}>
                    {props.name}
                </div>
            </ReactCardFlip>
        )
    }
}

export default Square;