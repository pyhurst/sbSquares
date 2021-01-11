import React from 'react';
import { Link } from 'react-router-dom';

const UserGameList = props => {
    return props.userGames.map(game => {
        return (
            <li key={game._id}>
                <Link to={`/game/${game._id}`} id={game._id} >{game._id}</Link>
            </li>
        )
    })
}

export default UserGameList;