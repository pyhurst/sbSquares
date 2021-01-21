import React from 'react';
import { Link } from 'react-router-dom';
import './UserGameList.css';

const UserGameList = props => {
    const copyLink = e => {
        navigator.clipboard.writeText(`https://www.thesquaresgame.com/game/${e.target.id}`)
    }

    return props.userGames.map(game => {
        return (
            <li className='user-list-item' key={game._id}>
                <Link to={`/game/${game._id}`} id={game._id} >{game.title || game._id}</Link>
                <button type='button' className='copybtn btn btn-outline-success btn-sm' onClick={copyLink} id={game._id}>Copy Link</button>
                <button type='button' className='copybtn btn btn-outline-danger btn-sm' onClick={props.openConfirmation} id={game._id}>X</button>
            </li>
        )
    })
}

export default UserGameList;