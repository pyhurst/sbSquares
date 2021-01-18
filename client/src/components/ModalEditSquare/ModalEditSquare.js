import React, { useEffect, useState } from "react";
import "./ModalEditSquare.css"

const ModalEditSquare = (props) => {
    return (
        <>
            <div className="modal fade  mod" data-backdrop="false" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={props.adminCheck}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title" id="exampleModalLabel">Square {props.squareId}</h5>
                        </div>
                        <div className={props.modalColor} style={{fontSize: "20px"}}>
                            Name: {props.editSquareName}
                            <br></br>
                            Number of Squares: {props.modalSquareCounter}
                            <br></br>

                            <select className="custom-select bg-black text-white" id="inputGroupSelect01" style={{fontSize: "12px"}}>
                                <option className="bg-black text-white" value="0">Choose...</option>
                                <option className="bg-black text-white" value="1">Delete</option>
                                <option className="bg-black text-white" value="2">Delete All</option>
                            </select>

                        </div>
                        <div className="modal-footer bg-foot">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className={props.modalButtonColor}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default ModalEditSquare;