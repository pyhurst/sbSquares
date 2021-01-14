const db = require("../models");


module.exports = io => {
    io.on("connection", (socket) => {
        console.log("New client connected");
    
        socket.on('getUpdatedGame', async (data)=>{
            
            let game = await db.Game.find({ownerId:data});
            console.log(game[0].squares)
            io.emit(data, game[0]);
        })
        
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });
};