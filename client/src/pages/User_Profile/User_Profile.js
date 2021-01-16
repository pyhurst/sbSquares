import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import API from '../../utils/API';
import UserGameList from '../../components/UserGameList/UserGameList';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import './User_Profile.css';

const UserProfile = (props) => {
    const [userGames, setUserGames] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState('');

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
        API.deleteGame(selectedGameId)
            .then(() => {
                setIsOpen(false)
                API.getUserGames(props.auth._id)
                .then(result => {
                    console.log(result.data)
                    setUserGames(result.data)
                })
            })
    }

    const openConfirmation = e => {
        setSelectedGameId(e.target.id);
        setIsOpen(true);
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
                        <Modal open={isOpen} gameId={selectedGameId} deleteGame={deleteGame} onClose={() => setIsOpen(false)}>Are you sure you want to permanently delete this game?</Modal>
                        <ul>
                            <UserGameList userGames={userGames} openConfirmation={openConfirmation} />
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