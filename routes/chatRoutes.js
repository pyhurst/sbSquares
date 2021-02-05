const db = require('../models');

module.exports = app => {
    app.get('/api/chat/:id', async (req, res) => {
        let data = await db.Chat.find({ chatId: req.params.id })
        if (data.length < 1) {
            let firstMessage = await db.Chat.create({ chatId: req.params.id, chat: [{ "name": "chat bot", "message": "Hi Welcome to Chat!" }] })
            console.log("first")
            console.log(firstMessage);
            res.json(firstMessage)
        }
        console.log(data);
        res.json(data)
    });

    app.put('/api/chat/:id', async (req, res) => {
        try {
            let chatData = await db.Chat.findByIdAndUpdate(
                req.params.id, {
                $push: { chat: req.body}
            }
            )
            res.json(chatData)

        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
};