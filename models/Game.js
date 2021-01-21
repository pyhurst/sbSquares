const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    title: String,
    gameType: String,
    xArray: [],
    yArray: [],
    xArrayTwo: [],
    yArrayTwo: [],
    xArrayThree: [],
    yArrayThree: [],
    xArrayFour: [],
    yArrayFour: [],
    costPerSquare: String,
    payouts: {
        one: String,
        two: String,
        three: String,
        four: String,
        email: String,
        phone: String,
        where: String
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