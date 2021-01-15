import React from 'react';
import { Link } from 'react-router-dom';
import './UserGameList.css';

const UserGameList = props => {
    const copyLink = (e) => {
        navigator.clipboard.writeText(`https://sb-sqaures.herokuapp.com/game/${e.target.id}`)
    }

    return props.userGames.map(game => {
        return (
            <li className='user-list-item' key={game._id}>
                <Link to={`/game/${game._id}`} id={game._id} >{game._id}</Link>
                <button type='button' className='copybtn btn btn-outline-success btn-sm' onClick={copyLink} id={game._id}>Copy</button>
            </li>
        )
    })
}

export default UserGameList;