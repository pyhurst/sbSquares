import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from '../pages/Landing/Landing';
import UserProfile from '../pages/User_Profile/User_Profile';
import Header from './Header/Header';

const App = () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/userprofile" component={UserProfile} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;