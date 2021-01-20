import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import API from '../../utils/API';
import UserGameList from '../../components/UserGameList/UserGameList';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import './User_Profile.css';

const UserProfile = (props) => {
    const [userGames, setUserGames] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState('');
    const [gameTitleInput, setGameTitleInput] = useState('');
    const [payoutOne, setPayoutOne] = useState('');
    const [payoutTwo, setPayoutTwo] = useState('');
    const [payoutThree, setPayoutThree] = useState('');
    const [payoutFour, setPayoutFour] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('');
    const [paymentEmail, setPaymentEmail] = useState('');
    const [paymentPhone, setPaymentPhone] = useState('');

    useEffect(() => {
        getUserGames();
    }, [props.auth]);

    const createGame = e => {
        e.preventDefault();
        if(gameTitleInput === '') {
            alert('Must add a game title!')
            return;
        }
        API.createGame({
            ownerId: props.auth._id,
            title: gameTitleInput,
            payouts: {
                one: payoutOne,
                two: payoutTwo,
                three: payoutThree,
                four: payoutFour,
                email: paymentEmail,
                phone: paymentPhone,
                where: paymentInfo
            }
        }).then(() => getUserGames())

        setGameTitleInput('');
        setPayoutOne('');
        setPayoutTwo('');
        setPayoutThree('');
        setPayoutFour('');
        setPaymentInfo('');
        setPaymentEmail('');
        setPaymentPhone('');
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
                        setUserGames(result.data)
                    })
            })
    }

    const openConfirmation = e => {
        setSelectedGameId(e.target.id);
        setIsOpen(true);
    }

    const paymentInfoClick = e => {
        e.preventDefault();
        setPaymentInfo(e.target.value)
    }

    if (!props.auth) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Header />
                <div className='profile'>
                    <h1 id='profile-title'>User Profile</h1>
                    <h4 id='created-games-title'>Select a Game:</h4>
                    <div className='created-games'>
                        <Modal open={isOpen} gameId={selectedGameId} deleteGame={deleteGame} onClose={() => setIsOpen(false)}>Are you sure you want to permanently delete this game?</Modal>
                        <ul>
                            <UserGameList userGames={userGames} openConfirmation={openConfirmation} />
                        </ul>
                    </div>
                    <form className='game-title-div'>
                        <h4>Create a Game:</h4>
                        <input
                            className='search-input game-title-input'
                            placeholder='Game Title'
                            value={gameTitleInput}
                            onChange={e => setGameTitleInput(e.target.value)} />
                        <div className='payout-info-div'>
                            <h5>Payouts per Quarter ($):</h5>
                            <label>1<sup>st</sup> :</label>
                            <input className='payout-qtr-input' placeholder='1st' value={payoutOne} onChange={e => setPayoutOne(e.target.value)} />
                            <label>2<sup>nd</sup> :</label>
                            <input className='payout-qtr-input' placeholder='2nd' value={payoutTwo} onChange={e => setPayoutTwo(e.target.value)} />
                            <br />
                            <label>3<sup>rd</sup> :</label>
                            <input className='payout-qtr-input' placeholder='3rd' value={payoutThree} onChange={e => setPayoutThree(e.target.value)} />
                            <label>4<sup>th</sup> :</label>
                            <input className='payout-qtr-input' placeholder='4th' value={payoutFour} onChange={e => setPayoutFour(e.target.value)} />
                        </div>
                        <div className='payment-info'>
                            <h5>Payment Info:</h5>
                            <p>(How should people pay you? Select One)</p>
                            <p>{paymentInfo}</p>
                            <div>
                                <button className='payment-info-button' value='Venmo' onClick={paymentInfoClick} >Venmo</button>
                                <button className='payment-info-button' value='Zelle' onClick={paymentInfoClick} >Zelle</button>
                                <button className='payment-info-button' value='Both' onClick={paymentInfoClick} >Both</button>
                            </div>
                            <input className='payment-email-input search-input' placeholder='Email' value={paymentEmail} onChange={e => setPaymentEmail(e.target.value)} />
                            <input className='payment-phone-input search-input' placeholder='Phone Number' value={paymentPhone} onChange={e => setPaymentPhone(e.target.value)} />
                        </div>
                        <div>
                            <button className='btn btn-success createbtn' onClick={createGame}>Create Game</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </>
        )

    }
}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(UserProfile);