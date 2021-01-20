import React from 'react';
import './Modal.css';

const Modal = props => {
    if (!props.open) return null

    return (
        <>
        <div className='modal-overlay' />
        <div className='modal-div'>
            {props.children}
            <button type='button' className='btn btn-outline-danger btn-sm modal-game-button' onClick={props.deleteGame} id={props.gameId}>Delete</button>
            <button className='btn btn-outline-danger btn-sm modal-game-button' onClick={props.onClose}>No</button>
        </div>
        </>
    )
}

export default Modal;