import React from 'react';

const UserGameList = props => {
    return props.userGames.map(game => {
        return (
            <li key={game._id} >
                <a>{game._id}</a>
            </li>
        )
    })
}

export default UserGameList;