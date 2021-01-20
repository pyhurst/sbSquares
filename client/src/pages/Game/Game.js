import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Square from "../../components/Square/Square.js";
import API from "../../utils/API";
import socketIOClient from "socket.io-client";
import { preSetSquares } from "../../utils/statesPrimer";
import Header from '../../components/Header/Header';
import ModalEditSquare from '../../components/ModalEditSquare/ModalEditSquare.js';
import "./Game.css"

console.log('file read')

let socket;
let pendingSquares = [];

const Game = (props) => {

    const [modalAdmin, setModalAdmin] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [game, setGame] = useState({});
    const [squares, setSquares] = useState(preSetSquares);
    const [editSquareName, setSquareName] = useState("");
    const [squareId, setSquareId] = useState("");
    const [modalColor, setModalColor] = useState("");
    const [modalButtonColor, setModalButtonColor] = useState("");
    const [modalSquareCounter, setModalSquareCounter] = useState("");
    const [modalOptionValue, setModalOptionValue] = useState("");
    const [showNumbers,setShowNumbers] = useState("none")

    let flip = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    const [flipStatus, setFlipStatus] = useState(flip);
    const rowLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        socket = socketIOClient();
        socket.on(props.match.params.id, (game) => {
            setGame(game)
            setSquares(game.squares)
            let show = "normal";
            for(let i = 0; i < game.squares.length; i++){
                if(game.squares[i].active ===  true){
                    show = "none"
                }
            }
            setShowNumbers(show);

        });

        API.getGame(props.match.params.id).then((game) => {
            if (game.data !== "") {
                setGame(game.data)
                setSquares(game.data.squares)
                let show = "normal";
                for(let i = 0; i < game.data.squares.length; i++){
                    if(game.data.squares[i].active ===  true){
                        show = "none"
                    }
                }
                setShowNumbers(show);
                socket.emit('getUpdatedGame', props.match.params.id);
                if (props.auth) {
                    adminCheck(game.data);
                }
            } else {
                window.location.href = "/"
            }
        })

        return () => {
            pendingSquares = [];
            socket.disconnect()
        };
    }, [props.auth]);

    const flipFunction = (event) => {
        let chosenSquare = event.target.id
        let chosenAlready = false;

        //delete from array on second click
        for (var i = 0; i < pendingSquares.length; i++) {
            if (pendingSquares[i] == chosenSquare) {
                chosenAlready = true
                pendingSquares.splice(i, 1)
            }
        }

        //add to array on first click
        if (chosenAlready == false) {
            pendingSquares.push(chosenSquare)
        }
        for (let i = 0; i < pendingSquares.length; i++) {
            flip[pendingSquares[i]] = !flip[pendingSquares[i]]
        }
        setFlipStatus(flip);
    }

    const updateGame = async () => {
        try {
            await API.updateGame(props.match.params.id, { pendingSquares: pendingSquares, firstName: firstName, lastName: lastName });
            socket.emit('getUpdatedGame', props.match.params.id);

        } catch (error) {
            console.log(error)
        }
    }

    const adminCheck = (game) => {
        if (props.auth._id === game.ownerId) {
            console.log("Hello Admin")
            setModalAdmin(true)
        }
    }

    const adminEdit = (event) => {
        let choice = event.target.id;
        let colorIndex = squares[choice].color.indexOf(" ");
        let colorBody = squares[choice].color.slice(0, colorIndex);
        let colorButton = "btn shadow-lg " + colorBody;
        colorBody = "modal-body " + colorBody;
        let a = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].name === squares[choice].name) {
                a++
            }
        }
        setModalSquareCounter(a);
        setModalButtonColor(colorButton);
        setModalColor(colorBody);
        setSquareId(choice);
        setSquareName(squares[choice].name)
    }

    const handleChangeModal = (event) => {
        setModalOptionValue(event.target.value)
    }

    const modalSubmitButton = async () => {
        if (modalOptionValue === "Delete") {
            try {
                await API.updateSquare(props.match.params.id, { id: squareId });
                socket.emit('getUpdatedGame', props.match.params.id);
            } catch (error) {
                console.log(error)
            }
        }
        if (modalOptionValue === "Delete All") {
            try {
                await API.deleteParticipant(props.match.params.id, editSquareName);
                socket.emit('getUpdatedGame', props.match.params.id);
            } catch (error) {
                console.log(error)
            }
        }
    }




    return (
        <>
            <Header />
            <div className="text-white justify-content-center game-square">
                <div className="row mb-2">
                    <div className="col-3 col-md-4">
                    </div>
                    <div className="col-7 col-md-5 text-center">
                        <div className="row">
                            <div className="col-6 col-md-4 pr-1">
                                <input type="name" className="input-name" placeholder="first" value={firstName} onChange={(event) => { setFirstName(event.target.value) }}></input>
                            </div>
                            <div className="col-6 col-md-4 pr-1">
                                <input type="name" className="input-name" placeholder="last" value={lastName} onChange={(event) => { setLastName(event.target.value) }}></input>
                            </div>
                            <div className="col-12 col-md-4 input-button">
                                <button disabled={!(firstName && lastName)} onClick={updateGame} type="button" className="btn btn-outline-danger btn-submit">submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 col-md-2"></div>
                </div>
                <div className="row">
                    <div className="col-2 col-md-3 justify-content-right">
                        <div className="row">
                            <div className="col-10">
                            </div>
                            <div className="col-2 mt-5">
                                <div>
                                    <h2 className="text-right y-row">0</h2>
                                    <h2 className="text-right y-row">1</h2>
                                    <h2 className="text-right y-row">2</h2>
                                    <h2 className="text-right y-row">3</h2>
                                    <h2 className="text-right y-row">4</h2>
                                    <h2 className="text-right y-row">5</h2>
                                    <h2 className="text-right y-row">6</h2>
                                    <h2 className="text-right y-row">7</h2>
                                    <h2 className="text-right y-row">8</h2>
                                    <h2 className="text-right y-row">9</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-md-8">
                        <div className="row">
                            <div className="col-12 text-left">
                                <div>
                                    <h2 id="h0" className="h-numbers">0</h2><h2 id="h1" className="h-numbers" >1</h2>
                                    <h2 id="h2" className="h-numbers">2</h2><h2 id="h3" className="h-numbers">3</h2>
                                    <h2 id="h4" className="h-numbers">4</h2><h2 id="h5" className="h-numbers">5</h2>
                                    <h2 id="h6" className="h-numbers">6</h2><h2 id="h7" className="h-numbers">7</h2>
                                    <h2 id="h8" className="h-numbers">8</h2><h2 id="h9" className="h-numbers">9</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i}>
                                    <Square squareId="1-2" id={i} adminEdit={adminEdit} color={squares[i].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i]} active={squares[i].active}>
                                        {squares[i].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 10}>
                                    <Square squareId="1-2" id={i + 10} adminEdit={adminEdit} color={squares[i + 10].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 10]} active={squares[i + 10].active}>
                                        {squares[i + 10].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 20}>
                                    <Square squareId="1-2" id={i + 20} adminEdit={adminEdit} color={squares[i + 20].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 20]} active={squares[i + 20].active}>
                                        {squares[i + 20].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 30}>
                                    <Square squareId="1-2" id={i + 30} adminEdit={adminEdit} color={squares[i + 30].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 30]} active={squares[i + 30].active}>
                                        {squares[i + 30].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 40}>
                                    <Square squareId="1-2" id={i + 40} adminEdit={adminEdit} color={squares[i + 40].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 40]} active={squares[i + 40].active}>
                                        {squares[i + 40].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 50}>
                                    <Square squareId="1-2" id={i + 50} adminEdit={adminEdit} color={squares[i + 50].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 50]} active={squares[i + 50].active}>
                                        {squares[i + 50].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 60}>
                                    <Square squareId="1-2" id={i + 60} adminEdit={adminEdit} color={squares[i + 60].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 60]} active={squares[i + 60].active}>
                                        {squares[i + 60].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 70}>
                                    <Square squareId="1-2" id={i + 70} adminEdit={adminEdit} color={squares[i + 70].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 70]} active={squares[i + 70].active}>
                                        {squares[i + 70].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 80}>
                                    <Square squareId="1-2" id={i + 80} adminEdit={adminEdit} color={squares[i + 80].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 80]} active={squares[i + 80].active}>
                                        {squares[i + 80].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 90}>
                                    <Square squareId="1-2" id={i + 90} adminEdit={adminEdit} color={squares[i + 90].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 90]} active={squares[i + 90].active}>
                                        {squares[i + 90].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-1 bg-danger"></div>
                <ModalEditSquare modalAdmin={modalAdmin} squareId={squareId} editSquareName={editSquareName} modalColor={modalColor} modalButtonColor={modalButtonColor} modalSquareCounter={modalSquareCounter} handleChangeModal={handleChangeModal} modalOptionValue={modalOptionValue} modalSubmitButton={modalSubmitButton}></ModalEditSquare>
                {/* container end div */}
            </div>

        </>
    )

}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Game);