const db = require("../models");


module.exports = io => {
    io.on("connection", (socket) => {
        console.log("New client connected");
    
        socket.on('getUpdatedGame', async (gameId)=>{
            let game = await db.Game.find({_id:gameId});
            io.emit(gameId, game[0]);
        })
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });
};