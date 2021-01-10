const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    googleId: String
});



const User = model("User", userSchema);

module.exports = User;
