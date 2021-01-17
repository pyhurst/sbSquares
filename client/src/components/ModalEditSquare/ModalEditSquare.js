import React, { useEffect, useState } from "react";
import "./ModalEditSquare.css"

const ModalEditSquare = (props) => {
console.log(props)
   
    return (
        <>
            
                <div className="modal fade  mod" data-backdrop="false" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={props.adminCheck}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Square {props.editSquare}</h5>
                                <button type="button" className="close bg-white" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body bg-danger">
                            Name: {props.editSquareName}
                            </div>
                            <div className="modal-footer bg-danger bg-foot">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
           

        </>
    )

}


export default ModalEditSquare;