import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import API from '../../utils/API';
import UserGameList from '../../components/UserGameList/UserGameList';
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
        }).then(result => setUserGames(result.data))
    }

    const getUserGames = () => {
        if(!props.auth){
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
        if (window.innerWidth > 500) {
            return (
                <>
                    <div className='profile'>
                        <h2>User Profile Desktop</h2>
                        <div className='created-games'>
                            <ul>
                                <UserGameList userGames={userGames} />
                            </ul>
                        </div>
                        <button type='button' className='btn btn-success' onClick={createGame}>Create Game</button>
                    </div>

                </>
            )

        } else {

            return (
                <div>User Profile Mobile</div>
            )
        }
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(UserProfile);