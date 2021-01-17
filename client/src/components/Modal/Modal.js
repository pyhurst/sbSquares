import React from 'react';
import './Modal.css';

const Modal = props => {
    if (!props.open) return null

    return (
        <>
        <div className='modal-overlay' />
        <div className='modal-div'>
            {props.children}
            <button type='button' className='copybtn btn btn-outline-danger btn-sm' onClick={props.deleteGame} id={props.gameId}>Delete</button>
            <button className='btn btn-outline-danger btn-sm' onClick={props.onClose}>No</button>
        </div>
        </>
    )
}

export default Modal;