import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import "./Landing.css";

const Landing = (props) => {
    const [searchInput, setSearchInput] = useState('');
    let history = useHistory();

    const renderContent = () => {
        switch (props.auth) {
            case null:
                return <a href='/auth/google'><h4 className='create-game'>Create Game</h4></a>
            case false:
                return <a href='/auth/google'><h4 className='create-game'>Create Game</h4></a>
            default:
                return <a href='/userprofile'><h4 className='create-game'>Create Game</h4></a>
        }
    }

    useEffect(() => {
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        API.getGame(searchInput)
            .then(result => {
                if(result.data === '') {
                    return alert('Sorry game not found, try again!')
                }

                history.push(`/game/${result.data._id}`)
            })
    };


    return (
        <>
            <div className='container landing-container'>
                <h1 id='landing-title'>Squares</h1>
                <div id='title-box'>
                    <form className='search-game'>
                        <h4>Search Game:</h4>
                        <input
                            className='search-input'
                            placeholder='Search Game by Id'
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        <button className='search-game-button' onClick={handleFormSubmit} >Search</button>
                    </form>
                    <div className='instructions'>
                        <h5>1. Create a Game w/ Google</h5>
                        <h5>2. Send Game link to your friends</h5>
                        <h5>3. Add your name and click Squares you would like to fill... then save!</h5>
                        <h5>4. Once ALL 100 squares are filled, numbers will be drawn at random for each team (0-9)</h5>
                    </div>
                    <div className='create-game' >
                        {renderContent()}
                    </div>
                </div>
            </div>
        </>
    )

}



function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);