import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import API from '../../utils/API';
import './User_Profile.css';

class UserProfile extends React.Component {
    createGame = () => {
        // console.log(this.props.auth.googleId)
        API.saveGame({
            ownerId: this.props.auth.googleId
        })
            .then(result => console.log(result))
    }
    
    render(){
    // console.log(this.props.auth.googleId)
    if(window.innerWidth > 500){
        return (
            <>
                <div className='profile'>
                    <h2>User Profile Desktop</h2>
                    <div className='created-games'></div>
                    <button type='button' className='btn btn-success' onClick={this.createGame}>Create Game</button>
                </div>
            
            </>
        )

    }else{
          
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