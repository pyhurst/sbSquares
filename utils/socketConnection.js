const db = require("../models");


module.exports = io => {
    io.on("connection", (socket) => {
        console.log("New client connected");
    
        socket.on('getUpdatedGame', async (gameId)=>{
            let game = await db.Game.find({_id:gameId});
            for(let i = 0; i < game[0].squares.length; i++){
                let index =  game[0].squares[i].name.indexOf(" ");
                game[0].squares[i].initials = game[0].squares[i].name[0] + game[0].squares[i].name[index + 1]
            }
            io.emit(gameId, game[0]);
        })
        socket.on('socketUpdatedChat', async (chatId)=>{
            console.log(chatId)
            console.log('hi')
            let chatData = await db.Chat.find({ chatId: chatId })
            if (chatData.length < 1) {
                let firstMessage = await db.Chat.create({ chatId: chatId, chat: [{ "name": "Chat Bot", "message": "Hi, Welcome to Chat!" }] })
                console.log("first")
                console.log(firstMessage);
                res.json(firstMessage)
            }
            console.log(chatData)
            io.emit(chatId + "chat", chatData);
        })
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });
};