import React from 'react';
import { Link } from 'react-router-dom';

const UserGameList = props => {
    const copyLink = () => {

    }

    return props.userGames.map(game => {
        return (
            <li key={game._id}>
                <Link to={`/game/${game._id}`} id={game._id} >{game._id}</Link>
                <button type='button' className='btn btn-success' onClick={copyLink}>Copy</button>
            </li>
        )
    })
}

export default UserGameList;