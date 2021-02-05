import React, { useState } from 'react';
import API from "../../utils/API";
import './ChatModal.css';

const ChatModal = props => {
    const [chatName, setChatName] = useState("");
    const [chatMessage, setChatMessage] = useState("");

    const renderChat = props => {
        if (props.chat.length > 0) {
            return props.chat.map(msg => {
                return (
                    <p><span className="chat-name">{msg.name}</span>: {msg.message}</p>
                )
            })
        }

        return;
    }

    const updateChat = async () =>{
        if (chatName === "" || chatMessage === "") {
            alert("You must enter a name and message!");
            return;
        }
        try {
            await API.updateChat(props.chatId, { name: chatName, message: chatMessage});
            props.socketUpdatedChat();
            setChatMessage("");

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="modal fade  mod" data-backdrop="false" id="ChatModal" data-bs-backdrop="static" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={props.adminCheck}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title" id="exampleModalLabel">Game Chat</h5>
                        </div>
                        <div className="chat-msg-div" style={{ fontSize: "20px" }}>
                            {renderChat(props)}
                        </div>
                        <div className="modal-footer bg-foot">
                            <input className="input-name" placeholder="Name" value={chatName} onChange={e => setChatName(e.target.value)} />
                            <input className="input-name" placeholder="Message" value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
                            <button type="button" className="btn btn-success" onClick={updateChat}>Send</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatModal;