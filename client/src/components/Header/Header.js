import React from 'react';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Squares</a>
                    <a href="/auth/google">Login With Google</a>
                </div>
            </nav>
        </div>
    )
}

export default Header;