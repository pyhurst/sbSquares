const db = require('../models');

module.exports = app => {
    app.get('/api/chat/:id', async (req, res) => {
        try {
            let chatData = await db.Chat.find({ chatId: req.params.id })
            if (chatData.length < 1) {
                await db.Chat.create({ chatId: req.params.id, chat: [{ "name": "Chat Bot", "message": "Hi, Welcome to Chat!" }] })
                chatData = await db.Chat.find({ chatId: req.params.id })
            }
            res.json(chatData)
        } catch (error) {
            console.log(error);
            res.send(error);
        }

    });

    app.put('/api/chat/:id', async (req, res) => {
        try {
            let chatData = await db.Chat.findByIdAndUpdate(
                req.params.id, {
                $push: { chat: req.body }
            })
            res.json(chatData)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
};