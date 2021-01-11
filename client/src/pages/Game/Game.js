import React, { useEffect, useState } from "react";
import Square from "../../components/Square/Square.js"
import API from "../../utils/API"
import io from "socket.io-client"


// var socket;
let pendingSquares = [];
const Game = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [squares, setSquares] = useState([]);
    const [game, setGame] = useState([]);


    const [table, setTable] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);


    let flip = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    let isFlippedRow1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


    const flipFunction = (event) => {

        console.log(event.target)
        let value = event.target.id
        let chosenAlready = false;

        //delete from array on second click
        for (var i = 0; i < pendingSquares.length; i++) {
            if (pendingSquares[i] == value) {
                chosenAlready = true
                if (i == 0) {
                    pendingSquares.shift();
                } else {
                    var temp = pendingSquares[0];
                    pendingSquares[0] = pendingSquares[i];
                    pendingSquares[i] = temp;
                    pendingSquares.shift();
                }
            }
        }

        //add to array on first click
        if (chosenAlready == false) {
            pendingSquares.push(value)
        }

        let number = parseInt(event.target.id);
        console.log(typeof number + " " + number);

        for (let i = 0; i < pendingSquares.length; i++) {
            flip[pendingSquares[i]] = !flip[pendingSquares[i]]
        }

        setTable(flip);
        console.log(pendingSquares);
    }

    const updateGame = () => {
        API.updateGame(props.match.params.id, { pendingSquares: pendingSquares, firstName: firstName, lastName: lastName }).then(() => {
            API.getGame(props.match.params.id).then((data) => {
                console.log(data)
                setSquares(data.data.squares);
                setGame(data.data)
                
                if(squares.length === 0){
                    setSquares(data.data.squares)
                }
                console.log(data.data.squares[0].name)

                

            })

        })

    }


    useEffect(() => {


    }, []);

    const start = () => {
    }


    const APIs = (id) => {
        API.getGames().then((data) => { })
        API.getGame(id).then((data) => { })
        API.saveGame(id).then((data) => { });
        API.updateGame(id).then((data) => { })
        API.deleteGame(id).then((data) => { })
    }






    if (window.innerWidth > 500) {

        return (
            <>
                <div className="text-white justify-content-center">
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4 text-center">
                            <input placeholder="first" value={firstName} onChange={(event)=>{setFirstName(event.target.value)}}></input>
                            <input placeholder="last" value={lastName} onChange={(event)=>{setLastName(event.target.value)}}></input>

                            <button onClick={updateGame}>submit</button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-3 justify-content-right text-dark">
                            <div className="row">
                                <div className="col-10">
                                <h2 className="text-right mt-5">H</h2>
                                    <h2 className="text-right">O</h2>
                                    <h2 className="text-right">M</h2>
                                    <h2 className="text-right">E</h2>
                                </div>
                                <div className="col-2 mt-5">
                                    <h2 className="text-right mb-3">0</h2>
                                    <h2 className="text-right mb-3">1</h2>
                                    <h2 className="text-right mb-2">2</h2>
                                    <h2 className="text-right mb-2">3</h2>
                                    <h2 className="text-right mb-3">4</h2>
                                    <h2 className="text-right mb-3">5</h2>
                                    <h2 className="text-right mb-2">6</h2>
                                    <h2 className="text-right mb-3">7</h2>
                                    <h2 className="text-right mb-2">8</h2>
                                    <h2 className="text-right mb-2">9</h2>
                                </div>
                            </div>

                        </div>
                        <div className="col-8">
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <h2 className="text-center">{i}</h2>
                                        <Square squareId="1-2" key={i} id={i} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 10} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 10]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 20} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 20]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 30} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 30]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 40} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 40]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 50} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 50]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 60} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 60]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 70} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 70]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 80} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 80]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow1.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" key={i} id={i + 90} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={table[i + 90]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-1 bg-danger"></div>
                    {/* container end div */}
                </div>

            </>
        )

    } else {

        return (
            <div>Join Mobile</div>
        )

    }
}

export default Game;



