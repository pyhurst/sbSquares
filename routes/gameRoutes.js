const db = require('../models');
const { xArray, yArray, squaresPreSet } = require('../utils/gameFunctions');



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

    app.get('/api/game/:id', async (req, res) => {
        try {
            console.log(req.params.id)
            let game = await db.Game.find({ _id: req.params.id });
            for(let i = 0; i < game[0].squares.length; i++){
                let index =  game[0].squares[i].name.indexOf(" ");
                game[0].squares[i].initials = game[0].squares[i].name[0] + game[0].squares[i].name[index + 1]
            }
            res.json(game[0]);
        } catch (error) {
            res.status(500).send()
        }
    })

    app.get('/api/games/:id', (req, res) => {
        console.log(req.params.id);
        db.Game.find({ ownerId: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    });

    app.put('/api/game/:id', async (req, res) => {
        try {
            let name = req.body.firstName + " " + req.body.lastName;
            let game = await db.Game.find({ _id: req.params.id });
            let squares = game[0].squares;
            for (let i = 0; i < req.body.pendingSquares.length; i++) {
                if(squares[parseInt(req.body.pendingSquares[i])].active === true){
                    squares[parseInt(req.body.pendingSquares[i])].name = name;
                    squares[parseInt(req.body.pendingSquares[i])].active = false;
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
}