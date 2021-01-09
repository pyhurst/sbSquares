import React, { useEffect, useState } from "react";
import "./Landing.css";

const Landing = () => {

    const [email, setEmail] = useState("");

    useEffect(() => {
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    const handleCreateGame = (event) => {
        window.location = '/auth/google';
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
                    <div className='create-game' onClick={handleCreateGame} >
                        <h4>Create Game</h4>
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

export default Landing;