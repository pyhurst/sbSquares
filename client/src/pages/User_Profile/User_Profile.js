import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import API from '../../utils/API';
import UserGameList from '../../components/UserGameList/UserGameList';
import Header from '../../components/Header/Header';
import './User_Profile.css';

const UserProfile = (props) => {
    const [userGames, setUserGames] = useState([]);

    useEffect(() => {
        getUserGames();
    }, [props.auth]);

    const createGame = () => {
        console.log(props.auth._id)
        API.createGame({
            ownerId: props.auth._id
        }).then(() => getUserGames())
    }

    const getUserGames = () => {
        if (!props.auth) {
            return;
        }
        API.getUserGames(props.auth._id)
            .then(result => {
                console.log(result.data)
                setUserGames(result.data)
            })
    }

    const deleteGame = e => {
        API.deleteGame(e.target.id)
            .then(() => {
                API.getUserGames(props.auth._id)
                .then(result => {
                    console.log(result.data)
                    setUserGames(result.data)
                })
            })
    }

    if (!props.auth) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Header />
                <div className='profile'>
                    <h1>User Profile</h1>
                    <h4 id='created-games-title'>Created Games</h4>
                    <div className='created-games'>
                        <ul>
                            <UserGameList userGames={userGames} deleteGame={deleteGame} />
                        </ul>
                    </div>
                    <button type='button' className='btn btn-success createbtn' onClick={createGame}>Create Game</button>
                </div>

            </>
        )

    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(UserProfile);