import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from '../pages/Landing/Landing';
import UserProfile from '../pages/User_Profile/User_Profile';
import Header from './Header/Header';
import Game from '../pages/Game/Game'

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/game" component={Game} />
                        <Route exact path="/userprofile" component={UserProfile} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);