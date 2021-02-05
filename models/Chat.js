const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
    chatId: String,
    chat:[{
        name: String,
        message: String,
    }]
});



const Chat = model("Chat", chatSchema);

module.exports = Chat;