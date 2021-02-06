import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import API from "../../utils/API";
import ChatModal from "../ChatModal/ChatModal";
import "./ChatBox.css"

let socket;

const ChatBox = (props) => {
    const [chatName, setChatName] = useState("");
    const [chatMessage, setChatMessage] = useState("");
    const [chat, setChat] = useState([]);
    
    useEffect(() => {
        if (!props.chat) return null;

        setChat(props.chat)
    }, [props.chat]);

    return (
        <>
            <div className="chat-div" data-bs-toggle="modal" data-bs-target="#ChatModal">
                <h3>CHAT</h3>
            </div>
            <ChatModal chat={chat} socketGetUpdatedChat={props.socketGetUpdatedChat} paramsId={props.paramsId} chatId={props.chatId}></ChatModal>
        </>
    )

}

export default ChatBox;