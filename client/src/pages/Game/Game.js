import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Square from "../../components/Square/Square.js";
import API from "../../utils/API";
import socketIOClient from "socket.io-client";
import { preSetSquares } from "../../utils/statesPrimer";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ModalEditSquare from '../../components/ModalEditSquare/ModalEditSquare.js';
import "./Game.css"

let socket;
let pendingSquares = [];

const Game = (props) => {

    const [modalAdmin, setModalAdmin] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [game, setGame] = useState();
    const [squares, setSquares] = useState(preSetSquares);
    const [editSquareName, setSquareName] = useState("");
    const [squareId, setSquareId] = useState("");
    const [modalColor, setModalColor] = useState("");
    const [modalButtonColor, setModalButtonColor] = useState("");
    const [modalSquareCounter, setModalSquareCounter] = useState("");
    const [modalOptionValue, setModalOptionValue] = useState("");
    const [xArray, setXarray] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [yArray, setYarray] = useState(["", "", "", "", "", "", "", "", "", ""]);
    const [blackNumbers, setBlackNumbers] = useState(true);
    const [qtrView, setQtrView] = useState('');
    const [showQtrOptions, setShowQtrOptions] = useState(false);

    let flip = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    const [flipStatus, setFlipStatus] = useState(flip);
    const rowLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        socket = socketIOClient();
        socket.on(props.match.params.id, (game) => {
            setGame(game)
            setSquares(game.squares)
            let finish = true
            for (let i = 0; i < game.squares.length; i++) {
                if (game.squares[i].active === true) {
                    finish = false
                    break;
                }
            }
            if (finish) {
                window.location.href = `/game/${props.match.params.id}`;
            } else {
                setXarray(["", "", "", "", "", "", "", "", "", ""]);
                setYarray(["", "", "", "", "", "", "", "", "", ""]);
                setShowQtrOptions(false);
                setQtrView('');
            }

        });

        API.getGame(props.match.params.id).then((game) => {
            if (game.data !== "") {
                setGame(game.data)
                setSquares(game.data.squares)
                let finish = true
                for (let i = 0; i < game.data.squares.length; i++) {
                    if (game.data.squares[i].active === true) {
                        finish = false
                        break;
                    }
                }
                if (finish) {
                    setXarray(game.data.xArray);
                    setYarray(game.data.yArray);
                    if(game.data.gameType === 'PerQtr') {
                        setShowQtrOptions(true);
                        setQtrView('1st Quarter')
                    }
                } else {
                    setXarray(["", "", "", "", "", "", "", "", "", ""]);
                    setYarray(["", "", "", "", "", "", "", "", "", ""]);
                }
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

    const renderQuarterClick = e => {
        if(e.target.value === 'One') {
            setQtrView('1st Quarter')
            setXarray(game.xArray)
            setYarray(game.yArray)
        } else if (e.target.value === 'Two') {
            setQtrView('2nd Quarter')
            setXarray(game.xArrayTwo)
            setYarray(game.yArrayTwo)
        } else if (e.target.value === 'Three') {
            setQtrView('3rd Quarter')
            setXarray(game.xArrayThree)
            setYarray(game.yArrayThree)
        } else {
            setQtrView('4th Quarter')
            setXarray(game.xArrayFour)
            setYarray(game.yArrayFour)
        }
        
    }

    const renderQtrOptions = () => {
        if (!game || game.gameType === 'Single') {
            return;
        }

        if (showQtrOptions === false) {
            return;
        }

        return (
            <>
                <button className='payment-info-button qtr-view-btns' value='One' onClick={renderQuarterClick} >1st Qtr</button>
                <button className='payment-info-button qtr-view-btns' value='Two' onClick={renderQuarterClick} >2nd Qtr</button>
                <br />
                <button className='payment-info-button qtr-view-btns' value='Three' onClick={renderQuarterClick} >3rd Qtr</button>
                <button className='payment-info-button qtr-view-btns' value='Four' onClick={renderQuarterClick} >4th Qtr</button>
            </>
        )
    }

    const updateGame = async () => {
        if (firstName.length <= 1 || lastName.length <= 1) {
            alert('Must add FULL first and last name!')
            return;
        }
        try {
            await API.updateGame(props.match.params.id, { pendingSquares: pendingSquares, firstName: firstName.toUpperCase(), lastName: lastName.toUpperCase() });
            socket.emit('getUpdatedGame', props.match.params.id);

        } catch (error) {
            console.log(error)
        }
    }

    const adminCheck = (game) => {
        if (props.auth._id === game.ownerId) {
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



    const renderPaymentInfo = () => {
        if (!game) {
            return;
        }

        // if (game.payouts.one === '' && game.payouts.where === '') {
        //     return <h1>{game.title}</h1>
        // }

        // if (game.payouts.where === '') {
        //     return (
        //         <>
        //             <h1>{game.title}</h1>
        //             <h4 className='game-direction-title'>Payouts per Quarter:</h4>
        //             <p>1st: ${game.payouts.one} 2nd: ${game.payouts.two}</p>
        //             <p>3rd: ${game.payouts.three} 4th: ${game.payouts.four}</p>
        //         </>
        //     )
        // }

        const copyLink = e => {
            navigator.clipboard.writeText(`https://www.thesquaresgame.com/game/${e.target.id}`)
        }

        const renderWhere = () => {
            if (game.payouts.where === 'Both') {
                return <p>Venmo or Zelle @</p>
            }

            return <p>{game.payouts.where} @</p>
        }

        return (
            <>
                <h1 id='game-title'>{game.title}</h1>
                <h4>Game id:</h4>
                <h6>{game._id}</h6>
                <button type='button' className='copybtn btn btn-outline-success btn-sm' onClick={copyLink} id={game._id}>Copy Link</button>
                <h4 className='game-direction-title'>Cost per Square:</h4>
                <h6 className='payouts-per-qtr'>{game.costPerSquare}</h6>
                <h4 className='game-direction-title'>Payment Info:</h4>
                <h6>{renderWhere()}</h6>
                <h6>Email: {game.payouts.email}</h6>
                <h6>Phone: {game.payouts.phone}</h6>
                <h4 className='game-direction-title'>Payouts per Quarter:</h4>
                <h6 className='payouts-per-qtr'>1st: {game.payouts.one}</h6>
                <h6 className='payouts-per-qtr'>2nd: {game.payouts.two}</h6>
                <h6 className='payouts-per-qtr'>3rd: {game.payouts.three}</h6>
                <h6 className='payouts-per-qtr'>4th: {game.payouts.four}</h6>
                <h2 className='game-direction-title' id='game-direction-title'>Input your name, select Squares, and submit!</h2>
            </>
        )
    }

    return (
        <>
            <div className='container'>
                <Header />
                <div className='game-info'>
                    {renderPaymentInfo()}
                </div>
            </div>
            <div className="game-square">
                <div className="row mb-2 maybe">
                    <div className="col-1 col-md-3"></div>
                    <div className="col-8 col-md-6 text-center name-inputs-div" id="name-div">
                        <div className="row input-box">
                            <div className="col-6 col-md-4 pr-1" id="please">
                                <input type="name" className="input-name" id='first-name-input' placeholder="first" value={firstName} onChange={(event) => { setFirstName(event.target.value) }}></input>
                            </div>
                            <div className="col-6 col-md-4" id="please">
                                <input type="name" className="input-name" id='last-name-input' placeholder="last" value={lastName} onChange={(event) => { setLastName(event.target.value) }}></input>
                            </div>
                            <div>
                                <div className="col-12 col-md-4 input-button">
                                    <button onClick={updateGame} type="button" className="btn btn-outline-danger btn-submit">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>{renderQtrOptions()}</div>
                <h4>{qtrView}</h4>

                <div className="row game-box">
                    <div className="col-11">
                        <div className="row square-rows">
                            <div className="col-1" />
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i}>
                                    <Square squareId="1-2" id={i} blackNumbers={blackNumbers} adminEdit={adminEdit} color={squares[i].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i]} active={squares[i].active}>
                                        {xArray[i]}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[0]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i}>
                                    <Square squareId="1-2" id={i} adminEdit={adminEdit} color={squares[i].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i]} active={squares[i].active}>
                                        {squares[i].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[1]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 10}>
                                    <Square squareId="1-2" id={i + 10} adminEdit={adminEdit} color={squares[i + 10].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 10]} active={squares[i + 10].active}>
                                        {squares[i + 10].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[2]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 20}>
                                    <Square squareId="1-2" id={i + 20} adminEdit={adminEdit} color={squares[i + 20].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 20]} active={squares[i + 20].active}>
                                        {squares[i + 20].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[3]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 30}>
                                    <Square squareId="1-2" id={i + 30} adminEdit={adminEdit} color={squares[i + 30].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 30]} active={squares[i + 30].active}>
                                        {squares[i + 30].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[4]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 40}>
                                    <Square squareId="1-2" id={i + 40} adminEdit={adminEdit} color={squares[i + 40].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 40]} active={squares[i + 40].active}>
                                        {squares[i + 40].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[5]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 50}>
                                    <Square squareId="1-2" id={i + 50} adminEdit={adminEdit} color={squares[i + 50].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 50]} active={squares[i + 50].active}>
                                        {squares[i + 50].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[6]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 60}>
                                    <Square squareId="1-2" id={i + 60} adminEdit={adminEdit} color={squares[i + 60].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 60]} active={squares[i + 60].active}>
                                        {squares[i + 60].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[7]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 70}>
                                    <Square squareId="1-2" id={i + 70} adminEdit={adminEdit} color={squares[i + 70].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 70]} active={squares[i + 70].active}>
                                        {squares[i + 70].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[8]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 80}>
                                    <Square squareId="1-2" id={i + 80} adminEdit={adminEdit} color={squares[i + 80].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 80]} active={squares[i + 80].active}>
                                        {squares[i + 80].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                        <div className="row square-rows">
                            <div className='col-1 y-row'>
                                <p className='y-numbers'>{yArray[9]}</p>
                            </div>
                            {rowLength.map((user, i) => (
                                <div className="col-1" key={i + 90}>
                                    <Square squareId="1-2" id={i + 90} adminEdit={adminEdit} color={squares[i + 90].color} modalAdmin={modalAdmin} flipFunciton={flipFunction} isFlipped={flipStatus[i + 90]} active={squares[i + 90].active}>
                                        {squares[i + 90].initials}
                                    </Square>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className='home'>NFC</p>
                </div>
                <div className="row">
                    <p className='away'>AFC</p>
                </div>
                <ModalEditSquare modalAdmin={modalAdmin} squareId={squareId} editSquareName={editSquareName} modalColor={modalColor} modalButtonColor={modalButtonColor} modalSquareCounter={modalSquareCounter} handleChangeModal={handleChangeModal} modalOptionValue={modalOptionValue} modalSubmitButton={modalSubmitButton}></ModalEditSquare>
                {/* container end div */}
            </div>
            <Footer />
        </>
    )

}


function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Game);