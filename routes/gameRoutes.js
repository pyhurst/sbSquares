const db = require('../models');
const { xArray, yArray, squaresPreSet } = require('../utils/GameFunctions');

module.exports = app => {

    app.get('/api/game/:id', async (req, res) => {

        try {
            console.log(req.params.id)
            let game = await db.Game.find({ ownerId: req.params.id });
            res.json(game[0]);

        } catch (error) {
            res.status(500).send()
        }
    })

    app.put('/api/game/:id', async (req, res) => {

        try {
            let pendingArray = [];
            let name = req.body.firstName + " " + req.body.lastName;
            let game = await db.Game.find({ ownerId: req.params.id });
            let squares = game[0].squares;
            for (let i = 0; i < req.body.pendingSquares.length; i++) {
                if(squares[parseInt(req.body.pendingSquares[i])].active === true){
                    squares[parseInt(req.body.pendingSquares[i])].name = name;
                    squares[parseInt(req.body.pendingSquares[i])].active = false;
                }
            };
            await db.Game.updateOne({ ownerId: req.params.id }, { squares: squares });
            let updatedGame = await db.Game.find({ ownerId: req.params.id });
            res.json(updatedGame);

        } catch (error) {
            res.status(500).send();
        }
    });


    app.post('/api/game/create/', async (req, res) => {

        try {
            req.body.xArray = xArray();
            req.body.yArray = yArray();
            req.body.squares = squaresPreSet();
            let dbModel = await db.Game.create(req.body);
            res.json(dbModel)

        } catch (error) {
            res.status(500).send();
        }
    });




}