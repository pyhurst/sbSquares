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

    if (!props.auth) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Header />
                <div className='profile'>
                    <h2>User Profile</h2>
                    <div className='created-games'>
                        <ul>
                            <UserGameList userGames={userGames} />
                        </ul>
                    </div>
                    <button type='button' className='btn btn-success' onClick={createGame}>Create Game</button>
                </div>

            </>
        )

    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(UserProfile);