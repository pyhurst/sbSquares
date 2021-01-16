import React, { useEffect } from "react";
import { connect } from 'react-redux';
import "./Landing.css";

const Landing = (props) => {

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

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <div className='container'>
                <h1 id='landing-title'>Squares</h1>
                <div id='title-box'>
                <div className='search-game'>
                    <h4>Search Game:</h4>
                    <input></input>
                </div>
                <div className='instructions'>
                    <h5>1. Create a Game w/ Google</h5>
                    <h5>2. Send Sqaures link to your friends</h5>
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