const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    xArray: [],
    yArray:[],
    ownerId: String,
    squares:[],
    date: {
        type: Date,
        default: Date.now()
    } 
    
});

const Game = model("Game", gameSchema);

module.exports = Game;