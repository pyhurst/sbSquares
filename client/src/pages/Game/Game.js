import React, { useEffect, useState } from "react";
import Square from "../../components/Square/Square.js"
import API from "../../utils/API"

let tempArray = [];
const Game = () => {

    const [table, setTable] = useState([]);
    const [name, setName] = useState("");


    const [isFlipped, setIsFlipped] = useState(false);
    const [isFlipped1, setIsFlipped1] = useState(false);
    const [isFlipped2, setIsFlipped2] = useState(false);
    const [isFlipped3, setIsFlipped3] = useState(false);
    const [isFlipped4, setIsFlipped4] = useState(false);
    const [isFlipped5, setIsFlipped5] = useState(false);
    const [isFlipped6, setIsFlipped6] = useState(false);
    const [isFlipped7, setIsFlipped7] = useState(false);
    const [isFlipped8, setIsFlipped8] = useState(false);
    const [isFlipped9, setIsFlipped9] = useState(false);

    const [isFlipped10, setIsFlipped10] = useState(false);
    const [isFlipped11, setIsFlipped11] = useState(false);
    const [isFlipped12, setIsFlipped12] = useState(false);
    const [isFlipped13, setIsFlipped13] = useState(false);
    const [isFlipped14, setIsFlipped14] = useState(false);
    const [isFlipped15, setIsFlipped15] = useState(false);
    const [isFlipped16, setIsFlipped16] = useState(false);
    const [isFlipped17, setIsFlipped17] = useState(false);
    const [isFlipped18, setIsFlipped18] = useState(false);
    const [isFlipped19, setIsFlipped19] = useState(false);

    const [isFlipped20, setIsFlipped20] = useState(false);
    const [isFlipped21, setIsFlipped21] = useState(false);
    const [isFlipped22, setIsFlipped22] = useState(false);
    const [isFlipped23, setIsFlipped23] = useState(false);
    const [isFlipped24, setIsFlipped24] = useState(false);
    const [isFlipped25, setIsFlipped25] = useState(false);
    const [isFlipped26, setIsFlipped26] = useState(false);
    const [isFlipped27, setIsFlipped27] = useState(false);
    const [isFlipped28, setIsFlipped28] = useState(false);
    const [isFlipped29, setIsFlipped29] = useState(false);

    const [isFlipped30, setIsFlipped30] = useState(false);
    const [isFlipped31, setIsFlipped31] = useState(false);
    const [isFlipped32, setIsFlipped32] = useState(false);
    const [isFlipped33, setIsFlipped33] = useState(false);
    const [isFlipped34, setIsFlipped34] = useState(false);
    const [isFlipped35, setIsFlipped35] = useState(false);
    const [isFlipped36, setIsFlipped36] = useState(false);
    const [isFlipped37, setIsFlipped37] = useState(false);
    const [isFlipped38, setIsFlipped38] = useState(false);
    const [isFlipped39, setIsFlipped39] = useState(false);

    const [isFlipped40, setIsFlipped40] = useState(false);
    const [isFlipped41, setIsFlipped41] = useState(false);
    const [isFlipped42, setIsFlipped42] = useState(false);
    const [isFlipped43, setIsFlipped43] = useState(false);
    const [isFlipped44, setIsFlipped44] = useState(false);
    const [isFlipped45, setIsFlipped45] = useState(false);
    const [isFlipped46, setIsFlipped46] = useState(false);
    const [isFlipped47, setIsFlipped47] = useState(false);
    const [isFlipped48, setIsFlipped48] = useState(false);
    const [isFlipped49, setIsFlipped49] = useState(false);

    const [isFlipped50, setIsFlipped50] = useState(false);
    const [isFlipped51, setIsFlipped51] = useState(false);
    const [isFlipped52, setIsFlipped52] = useState(false);
    const [isFlipped53, setIsFlipped53] = useState(false);
    const [isFlipped54, setIsFlipped54] = useState(false);
    const [isFlipped55, setIsFlipped55] = useState(false);
    const [isFlipped56, setIsFlipped56] = useState(false);
    const [isFlipped57, setIsFlipped57] = useState(false);
    const [isFlipped58, setIsFlipped58] = useState(false);
    const [isFlipped59, setIsFlipped59] = useState(false);

    const [isFlipped60, setIsFlipped60] = useState(false);
    const [isFlipped61, setIsFlipped61] = useState(false);
    const [isFlipped62, setIsFlipped62] = useState(false);
    const [isFlipped63, setIsFlipped63] = useState(false);
    const [isFlipped64, setIsFlipped64] = useState(false);
    const [isFlipped65, setIsFlipped65] = useState(false);
    const [isFlipped66, setIsFlipped66] = useState(false);
    const [isFlipped67, setIsFlipped67] = useState(false);
    const [isFlipped68, setIsFlipped68] = useState(false);
    const [isFlipped69, setIsFlipped69] = useState(false);

    const [isFlipped70, setIsFlipped70] = useState(false);
    const [isFlipped71, setIsFlipped71] = useState(false);
    const [isFlipped72, setIsFlipped72] = useState(false);
    const [isFlipped73, setIsFlipped73] = useState(false);
    const [isFlipped74, setIsFlipped74] = useState(false);
    const [isFlipped75, setIsFlipped75] = useState(false);
    const [isFlipped76, setIsFlipped76] = useState(false);
    const [isFlipped77, setIsFlipped77] = useState(false);
    const [isFlipped78, setIsFlipped78] = useState(false);
    const [isFlipped79, setIsFlipped79] = useState(false);

    const [isFlipped80, setIsFlipped80] = useState(false);
    const [isFlipped81, setIsFlipped81] = useState(false);
    const [isFlipped82, setIsFlipped82] = useState(false);
    const [isFlipped83, setIsFlipped83] = useState(false);
    const [isFlipped84, setIsFlipped84] = useState(false);
    const [isFlipped85, setIsFlipped85] = useState(false);
    const [isFlipped86, setIsFlipped86] = useState(false);
    const [isFlipped87, setIsFlipped87] = useState(false);
    const [isFlipped88, setIsFlipped88] = useState(false);
    const [isFlipped89, setIsFlipped89] = useState(false);

    const [isFlipped90, setIsFlipped90] = useState(false);
    const [isFlipped91, setIsFlipped91] = useState(false);
    const [isFlipped92, setIsFlipped92] = useState(false);
    const [isFlipped93, setIsFlipped93] = useState(false);
    const [isFlipped94, setIsFlipped94] = useState(false);
    const [isFlipped95, setIsFlipped95] = useState(false);
    const [isFlipped96, setIsFlipped96] = useState(false);
    const [isFlipped97, setIsFlipped97] = useState(false);
    const [isFlipped98, setIsFlipped98] = useState(false);
    const [isFlipped99, setIsFlipped99] = useState(false);


    let isFlippedRow1 = [isFlipped, isFlipped1, isFlipped2, isFlipped3, isFlipped4, isFlipped5, isFlipped6, isFlipped7, isFlipped8, isFlipped9];

    let isFlippedRow2 = [isFlipped10, isFlipped11, isFlipped12, isFlipped13, isFlipped14, isFlipped15, isFlipped16, isFlipped17, isFlipped18, isFlipped19];

    let isFlippedRow3 = [isFlipped20, isFlipped21, isFlipped22, isFlipped23, isFlipped24, isFlipped25, isFlipped26, isFlipped27, isFlipped28, isFlipped29];

    let isFlippedRow4 = [isFlipped30, isFlipped31, isFlipped32, isFlipped33, isFlipped34, isFlipped35, isFlipped36, isFlipped37, isFlipped38, isFlipped39];

    let isFlippedRow5 = [isFlipped40, isFlipped41, isFlipped42, isFlipped43, isFlipped44, isFlipped45, isFlipped46, isFlipped47, isFlipped48, isFlipped49];

    let isFlippedRow6 = [isFlipped50, isFlipped51, isFlipped52, isFlipped53, isFlipped54, isFlipped55, isFlipped56, isFlipped57, isFlipped58, isFlipped59];

    let isFlippedRow7 = [isFlipped60, isFlipped61, isFlipped62, isFlipped63, isFlipped64, isFlipped65, isFlipped66, isFlipped67, isFlipped68, isFlipped69];

    let isFlippedRow8 = [isFlipped70, isFlipped71, isFlipped72, isFlipped73, isFlipped74, isFlipped75, isFlipped76, isFlipped77, isFlipped78, isFlipped79];

    let isFlippedRow9 = [isFlipped80, isFlipped81, isFlipped82, isFlipped83, isFlipped84, isFlipped85, isFlipped86, isFlipped87, isFlipped88, isFlipped89];

    let isFlippedRow10 = [isFlipped90, isFlipped91, isFlipped92, isFlipped93, isFlipped94, isFlipped95, isFlipped96, isFlipped97, isFlipped98, isFlipped99];



    const flipFunction = (event) => {

        console.log(event.target)
        let value = event.target.id
        let chosenAlready = false;

        //delete from array on second click
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i] == value) {
                chosenAlready = true
                if (i == 0) {
                    tempArray.shift();
                } else {
                    var temp = tempArray[0];
                    tempArray[0] = tempArray[i];
                    tempArray[i] = temp;
                    tempArray.shift();
                }
            }
        }

        //add to array on first click
        if (chosenAlready == false) {
            tempArray.push(value)
        }

        let number = parseInt(event.target.id);
        console.log(typeof number + " " + number);

        //update flipped status
        switch (parseInt(event.target.id)) {
            case 0:
                setIsFlipped(!isFlipped)
                break;
            case 1:
                setIsFlipped1(!isFlipped1)
                break;
            case 2:
                setIsFlipped2(!isFlipped2)
                break;
            case 3:
                setIsFlipped3(!isFlipped3)
                break;
            case 4:
                setIsFlipped4(!isFlipped4)
                break;
            case 5:
                setIsFlipped5(!isFlipped5)
                break;
            case 6:
                setIsFlipped6(!isFlipped6)
                break;
            case 7:
                setIsFlipped7(!isFlipped7)
                break;
            case 8:
                setIsFlipped8(!isFlipped8)
                break;
            case 9:
                setIsFlipped9(!isFlipped9)
                break;
            case 10:
                setIsFlipped10(!isFlipped10)
                break;
            case 11:
                setIsFlipped11(!isFlipped11)
                break;
            case 12:
                setIsFlipped12(!isFlipped12)
                break;
            case 13:
                setIsFlipped13(!isFlipped13)
                break;
            case 14:
                setIsFlipped14(!isFlipped14)
                break;
            case 15:
                setIsFlipped15(!isFlipped15)
                break;
            case 16:
                setIsFlipped16(!isFlipped16)
                break;
            case 17:
                setIsFlipped17(!isFlipped17)
                break;
            case 18:
                setIsFlipped18(!isFlipped18)
                break;
            case 19:
                setIsFlipped19(!isFlipped19)
                break;
            case 20:
                setIsFlipped20(!isFlipped20)
                break;
            case 21:
                setIsFlipped21(!isFlipped21)
                break;
            case 22:
                setIsFlipped22(!isFlipped22)
                break;
            case 23:
                setIsFlipped23(!isFlipped23)
                break;
            case 24:
                setIsFlipped24(!isFlipped24)
                break;
            case 25:
                setIsFlipped25(!isFlipped25)
                break;
            case 26:
                setIsFlipped26(!isFlipped26)
                break;
            case 27:
                setIsFlipped27(!isFlipped27)
                break;
            case 28:
                setIsFlipped28(!isFlipped28)
                break;
            case 29:
                setIsFlipped29(!isFlipped29)
                break;
            case 30:
                setIsFlipped30(!isFlipped30)
                break;
            case 31:
                setIsFlipped31(!isFlipped31)
                break;
            case 32:
                setIsFlipped32(!isFlipped32)
                break;
            case 33:
                setIsFlipped33(!isFlipped33)
                break;
            case 34:
                setIsFlipped34(!isFlipped34)
                break;
            case 35:
                setIsFlipped35(!isFlipped35)
                break;
            case 36:
                setIsFlipped36(!isFlipped36)
                break;
            case 37:
                setIsFlipped37(!isFlipped37)
                break;
            case 38:
                setIsFlipped38(!isFlipped38)
                break;
            case 39:
                setIsFlipped39(!isFlipped39)
                break;
            case 40:
                setIsFlipped40(!isFlipped40)
                break;
            case 41:
                setIsFlipped41(!isFlipped41)
                break;
            case 42:
                setIsFlipped42(!isFlipped42)
                break;
            case 43:
                setIsFlipped43(!isFlipped43)
                break;
            case 44:
                setIsFlipped44(!isFlipped44)
                break;
            case 45:
                setIsFlipped45(!isFlipped45)
                break;
            case 46:
                setIsFlipped46(!isFlipped46)
                break;
            case 47:
                setIsFlipped47(!isFlipped47)
                break;
            case 48:
                setIsFlipped48(!isFlipped48)
                break;
            case 49:
                setIsFlipped49(!isFlipped49)
                break;
            case 50:
                setIsFlipped50(!isFlipped50)
                break;
            case 51:
                setIsFlipped51(!isFlipped51)
                break;
            case 52:
                setIsFlipped52(!isFlipped52)
                break;
            case 53:
                setIsFlipped53(!isFlipped53)
                break;
            case 54:
                setIsFlipped54(!isFlipped54)
                break;
            case 55:
                setIsFlipped55(!isFlipped55)
                break;
            case 56:
                setIsFlipped56(!isFlipped56)
                break;
            case 57:
                setIsFlipped57(!isFlipped57)
                break;
            case 58:
                setIsFlipped58(!isFlipped58)
                break;
            case 59:
                setIsFlipped59(!isFlipped59)
                break;
            case 60:
                setIsFlipped60(!isFlipped60)
                break;
            case 61:
                setIsFlipped61(!isFlipped61)
                break;
            case 62:
                setIsFlipped62(!isFlipped62)
                break;
            case 63:
                setIsFlipped63(!isFlipped63)
                break;
            case 64:
                setIsFlipped64(!isFlipped64)
                break;
            case 65:
                setIsFlipped65(!isFlipped65)
                break;
            case 66:
                setIsFlipped66(!isFlipped66)
                break;
            case 67:
                setIsFlipped67(!isFlipped67)
                break;
            case 68:
                setIsFlipped68(!isFlipped68)
                break;
            case 69:
                setIsFlipped69(!isFlipped69)
                break;
            case 70:
                setIsFlipped70(!isFlipped70)
                break;
            case 71:
                setIsFlipped71(!isFlipped71)
                break;
            case 72:
                setIsFlipped72(!isFlipped72)
                break;
            case 73:
                setIsFlipped73(!isFlipped73)
                break;
            case 74:
                setIsFlipped74(!isFlipped74)
                break;
            case 75:
                setIsFlipped75(!isFlipped75)
                break;
            case 76:
                setIsFlipped76(!isFlipped76)
                break;
            case 77:
                setIsFlipped77(!isFlipped77)
                break;
            case 78:
                setIsFlipped78(!isFlipped78)
                break;
            case 79:
                setIsFlipped79(!isFlipped79)
                break;
            case 80:
                setIsFlipped80(!isFlipped80)
                break;
            case 81:
                setIsFlipped81(!isFlipped81)
                break;
            case 82:
                setIsFlipped82(!isFlipped82)
                break;
            case 83:
                setIsFlipped83(!isFlipped83)
                break;
            case 84:
                setIsFlipped84(!isFlipped84)
                break;
            case 85:
                setIsFlipped85(!isFlipped85)
                break;
            case 86:
                setIsFlipped86(!isFlipped86)
                break;
            case 87:
                setIsFlipped87(!isFlipped87)
                break;
            case 88:
                setIsFlipped88(!isFlipped88)
                break;
            case 89:
                setIsFlipped89(!isFlipped89)
                break;
            case 90:
                setIsFlipped90(!isFlipped90)
                break;
            case 91:
                setIsFlipped91(!isFlipped91)
                break;
            case 92:
                setIsFlipped92(!isFlipped92)
                break;
            case 93:
                setIsFlipped93(!isFlipped93)
                break;
            case 94:
                setIsFlipped94(!isFlipped94)
                break;
            case 95:
                setIsFlipped95(!isFlipped95)
                break;
            case 96:
                setIsFlipped96(!isFlipped96)
                break;
            case 97:
                setIsFlipped97(!isFlipped97)
                break;
            case 98:
                setIsFlipped98(!isFlipped98)
                break;
            case 99:
                setIsFlipped99(!isFlipped99)
                break;

        }

        console.log(tempArray);
    }


    useEffect(() => {
        start();


    }, []);

    const start = () => {
        setTable(isFlippedRow1);
        setName("Francis");
        console.log(name)
        console.log(isFlippedRow1.length)
    }


    const APIs = (id) => {
        API.getGames().then((data) => { })
        API.getGame(id).then((data) => { })
        API.saveGame(id).then((data) => { });
        API.updateGame(id).then((data) => { })
        API.deleteGame(id).then((data) => { })
    }

    const clear = () => {
        setIsFlipped(false)
        setIsFlipped1(false)
        setIsFlipped2(false)
        setIsFlipped3(false)
        setIsFlipped4(false)
        setIsFlipped5(false)
        setIsFlipped6(false)
        setIsFlipped7(false)
        setIsFlipped8(false)
        setIsFlipped9(false)
        setIsFlipped10(false)
        setIsFlipped11(false)
        setIsFlipped12(false)
        setIsFlipped13(false)
        setIsFlipped14(false)
        setIsFlipped15(false)
        setIsFlipped16(false)
        setIsFlipped17(false)
        setIsFlipped18(false)
        setIsFlipped19(false)
        setIsFlipped20(false)
        setIsFlipped21(false)
        setIsFlipped22(false)
        setIsFlipped23(false)
        setIsFlipped24(false)
        setIsFlipped25(false)
        setIsFlipped26(false)
        setIsFlipped27(false)
        setIsFlipped28(false)
        setIsFlipped29(false)
        setIsFlipped30(false)
        setIsFlipped31(false)
        setIsFlipped32(false)
        setIsFlipped33(false)
        setIsFlipped34(false)
        setIsFlipped35(false)
        setIsFlipped36(false)
        setIsFlipped37(false)
        setIsFlipped38(false)
        setIsFlipped39(false)
        setIsFlipped40(false)
        setIsFlipped41(false)
        setIsFlipped42(false)
        setIsFlipped43(false)
        setIsFlipped44(false)
        setIsFlipped45(false)
        setIsFlipped46(false)
        setIsFlipped47(false)
        setIsFlipped48(false)
        setIsFlipped49(false)
        setIsFlipped50(false)
        setIsFlipped51(false)
        setIsFlipped52(false)
        setIsFlipped53(false)
        setIsFlipped54(false)
        setIsFlipped55(false)
        setIsFlipped56(false)
        setIsFlipped57(false)
        setIsFlipped58(false)
        setIsFlipped59(false)
        setIsFlipped60(false)
        setIsFlipped61(false)
        setIsFlipped62(false)
        setIsFlipped63(false)
        setIsFlipped64(false)
        setIsFlipped65(false)
        setIsFlipped66(false)
        setIsFlipped67(false)
        setIsFlipped68(false)
        setIsFlipped69(false)
        setIsFlipped70(false)
        setIsFlipped71(false)
        setIsFlipped72(false)
        setIsFlipped73(false)
        setIsFlipped74(false)
        setIsFlipped75(false)
        setIsFlipped76(false)
        setIsFlipped77(false)
        setIsFlipped78(false)
        setIsFlipped79(false)
        setIsFlipped80(false)
        setIsFlipped81(false)
        setIsFlipped82(false)
        setIsFlipped83(false)
        setIsFlipped84(false)
        setIsFlipped85(false)
        setIsFlipped86(false)
        setIsFlipped87(false)
        setIsFlipped88(false)
        setIsFlipped89(false)
        setIsFlipped90(false)
        setIsFlipped91(false)
        setIsFlipped92(false)
        setIsFlipped93(false)
        setIsFlipped94(false)
        setIsFlipped95(false)
        setIsFlipped96(false)
        setIsFlipped97(false)
        setIsFlipped98(false)
        setIsFlipped99(false)

    }





    if (window.innerWidth > 500) {

        return (
            <>
                <div className="text-white justify-content-center">
                    <div className="row">
                        <div className="col-4">
                        </div>
                        <div className="col-4 text-center">
                            <input placeholder="name"></input><button onClick={clear}>submit</button>
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
                                        <Square squareId="1-2" id={i} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow1[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow2.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 10} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow2[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow3.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 20} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow3[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow4.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 30} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow4[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow5.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 40} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow5[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow6.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 50} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow6[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow7.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 60} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow7[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow8.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 70} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow8[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow9.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 80} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow9[i]}>


                                        </Square>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {isFlippedRow10.map((user, i) => (
                                    <div className="col-1">
                                        <Square squareId="1-2" id={i + 90} color="bg-info text-center justify-content-center" flipFunciton={flipFunction} isFlipped={isFlippedRow10[i]}>


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
