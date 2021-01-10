const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    googleId: String
});



const Game = model("User", userSchema);

module.exports = Game;
