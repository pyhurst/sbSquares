import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import API from "../../utils/API";
import "./ChatBox.css"

let socket;

const ChatBox = (props) => {
    const [chatName, setChatName] = useState("");
    const [chatMessage, setChatMessage] = useState("");
    const [chat, setChat] = useState([])

    
    useEffect(() => {
        API.getChat(props.paramsId).then((chatData) => {
            console.log(chatData);
            if(chatData.data.chat){
                setChat(chatData.data.chat)
            }else{

                setChat(chatData.data[0].chat);
            }
        })
    }, []);

    const updateChat = async () =>{
        try {
            await API.updateChat(props.paramsId, { name: chatName, message: chatMessage});
            props.socketUpdatedChat();

        } catch (error) {
            console.log(error)
        }

    }


    if(props.chat.length > 0){
        return (
            <>
                <button className="chat-div" onClick={updateChat}>
                    <h3>{props.chat[0].name}</h3>
                </button>
            </>
        )
    }
   if(chat.length > 0){
    return (
        <>
            <button className="chat-div" onClick={updateChat}>
                <h3>{chat[0].name}</h3>
            </button>
        </>
    )
   }
    return (
        <>
            <button className="chat-div" onClick={updateChat}>
                <h3>chat</h3>
            </button>
        </>
    )

}

export default ChatBox;