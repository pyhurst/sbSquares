const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    title: String,
    xArray: [],
    yArray:[],
    payouts: {
        one: String,
        two: String,
        three: String,
        four: String,
        email: String,
        phone: String
    },
    ownerId: String,
    squares:[],
    date: {
        type: Date,
        default: Date.now()
    } 
    
});

const Game = model("Game", gameSchema);

module.exports = Game;