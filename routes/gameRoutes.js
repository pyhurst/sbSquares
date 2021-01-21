const db = require('../models');
const { xArray, yArray, squaresPreSet, classArray } = require('../utils/gameFunctions');



module.exports = app => {

    app.post('/api/game/create/', async (req, res) => {
        try {
            console.log(req.body)
            req.body.xArray = xArray();
            req.body.yArray = yArray();
            req.body.squares = squaresPreSet();
            let dbModel = await db.Game.create(req.body);
            res.json(dbModel)

        } catch (error) {
            res.status(500).send();
        }
    });

    app.post('/api/game/create/qtr', async (req, res) => {
        try {
            console.log(req.body)
            req.body.xArray = xArray();
            req.body.xArrayTwo = xArray();
            req.body.xArrayThree = xArray();
            req.body.xArrayFour = xArray();
            req.body.yArray = yArray();
            req.body.yArrayTwo = yArray();
            req.body.yArrayThree = yArray();
            req.body.yArrayFour = yArray();
            req.body.squares = squaresPreSet();
            let dbModel = await db.Game.create(req.body);
            res.json(dbModel)

        } catch (error) {
            res.status(500).send();
        }
    });

    app.get('/api/game/:id', async (req, res) => {
        try {
            console.log(req.params.id)
            let game = await db.Game.find({ _id: req.params.id })
            console.log(game)
            for (let i = 0; i < game[0].squares.length; i++) {
                let index = game[0].squares[i].name.indexOf(" ");
                game[0].squares[i].initials = game[0].squares[i].name[0] + game[0].squares[i].name[index + 1]
            }
            res.json(game[0]);
        } catch (error) {
            res.json("")
        }
    })

    app.get('/api/games/:id', (req, res) => {
        console.log(req.params.id);
        db.Game.find({ ownerId: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    });

    app.delete('/api/game/:id', (req, res) => {
        console.log(req.params.id);
        db.Game.deleteOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    });

    app.put('/api/game/:id', async (req, res) => {
        try {
            let name = req.body.firstName + " " + req.body.lastName;
            let game = await db.Game.find({ _id: req.params.id });
            let squares = game[0].squares;
            let color = classArray[Math.floor(Math.random() * classArray.length)];
            console.log(color)
            for (let i = 0; i < squares.length; i++) {
                if (squares[i].name.toUpperCase() === name.toUpperCase()) {
                    color = squares[i].color
                    break;
                }
            }
            console.log(color)
            for (let i = 0; i < req.body.pendingSquares.length; i++) {
                if (squares[parseInt(req.body.pendingSquares[i])].active === true) {
                    squares[parseInt(req.body.pendingSquares[i])].name = name;
                    squares[parseInt(req.body.pendingSquares[i])].active = false;
                    squares[parseInt(req.body.pendingSquares[i])].color = color;
                }
            };
            for (let i = 0; i < squares.length; i++) {
                delete squares[i].initials
            };

            await db.Game.updateOne({ _id: req.params.id }, { squares: squares });
            let updatedGame = await db.Game.find({ _id: req.params.id });
            res.json(updatedGame);
        } catch (error) {
            res.status(500).send();
        }
    });

    app.put("/api/square/:id", async (req, res) => {
        console.log(req.params.id);
        console.log(req.body)
        let game = await db.Game.find({ _id: req.params.id });
        let squares = game[0].squares;
        squares[req.body.id].name = "";
        squares[req.body.id].active = true;
        await db.Game.updateOne({ _id: req.params.id }, { squares: squares });
        res.json("s")

    })
    app.delete("/api/square/:id/:name", async (req, res) => {
        console.log(req.params.name);
        let game = await db.Game.find({ _id: req.params.id });
        let squares = game[0].squares;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].name.toUpperCase() === req.params.name.toUpperCase()) {
                squares[i].name = "";
                squares[i].active = true;
            }
        }
        await db.Game.updateOne({ _id: req.params.id }, { squares: squares });
        res.json("s")

    })
}