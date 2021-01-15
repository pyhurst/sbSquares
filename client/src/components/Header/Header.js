import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <a href='/auth/google'>Login With Google</a>
            default:
                return <a href='/api/logout'>Logout</a>
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <nav className="navbar">
                    <div className="container">
                        <Link
                            className="navbar-brand"
                            to={this.props.auth ? '/userprofile' : '/'}
                        >
                            <h4 className='navbar-title'>Squares</h4>
                        </Link>
                        {this.renderContent()}
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);