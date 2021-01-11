import React, { useEffect } from "react";
import { connect } from 'react-redux';
import "./Landing.css";

const Landing = (props) => {

    const renderContent = () => {
        switch (props.auth) {
            case null:
                return <a href='/auth/google'><h4>Create Game</h4></a>
            case false:
                return <a href='/auth/google'><h4>Create Game</h4></a>
            default:
                return <a href='/userprofile'><h4>Create Game</h4></a>
        }
    }

    useEffect(() => {
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    if(window.innerWidth > 500){

        return (
            <>
                <div className='container text-center'>
                    <h1>Squares</h1>
                    <div className='search-game'>
                        <h4>Search Game:</h4>
                        <input></input>
                    </div>
                    <div className='create-game' >
                        {renderContent()}
                    </div>
                </div>
            </>
        )

    } else {
          
        return (
            <div>Home Mobile</div>
        )

    }



}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);