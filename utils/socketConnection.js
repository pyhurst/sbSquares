const db = require("../models");
let a = 0

module.exports = io => {
    io.on("connection", (socket) => {
        io.emit("activeUsersOnGamePage", ++a)

        console.log("New client connected" + " " + a);
        socket.on('getUpdatedGame', async (gameId) => {
            try {
                let game = await db.Game.find({ _id: gameId });
                for (let i = 0; i < game[0].squares.length; i++) {
                    let index = game[0].squares[i].name.indexOf(" ");
                    game[0].squares[i].initials = game[0].squares[i].name[0] + game[0].squares[i].name[index + 1]
                }
                io.emit(gameId, game[0]);
            } catch (error) {
                console.log(error);
                res.send(error)
            }

        })
        socket.on('getUpdatedChat', async (chatId) => {
            try {
                let chatData = await db.Chat.find({ chatId: chatId })
                if (chatData.length < 1) {
                    await db.Chat.create({ chatId: chatId, chat: [{ "name": "Chat Bot", "message": "Hi, Welcome to Chat!" }] });
                    chatData = await db.Chat.find({ chatId: chatId })
                }
                io.emit(chatId + "chat", chatData);
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        })
        socket.on('disconnect', () => {
            io.emit("activeUsersOnGamePage", --a)
            console.log('user disconnected' + " " + a);
        });

    });
};