const db = require('../models');
const { xArray, yArray, squaresPreSet } = require('../utils/GameFunctions');

module.exports = app => {

    app.get('/api/game/:id', (req,res)=>{
        db.Game.find({_id:req.params.id}).then((game)=>{
            res.json(game[0])
        })
    })

    app.put('/api/game/:id', (req, res) => {
        db.Game.find({_id:req.params.id}).then((game)=>{
            console.log(game[0])
            console.log(req.body);
            let squares = game[0].squares
            let name = req.body.firstName + " " + req.body.lastName;
            for (let i =0; i < req.body.pendingSquares.length; i++ ){
                squares[parseInt(req.body.pendingSquares[i])].name = name;
                squares[parseInt(req.body.pendingSquares[i])].active = false;
            }
            db.Game.updateOne({_id:req.params.id},{squares:squares}).then(()=>{
                res.json({name:name})
            })
        })
    });



    app.post('/api/game/create/', (req, res) => {
        req.body.xArray = xArray();
        req.body.yArray = yArray();
        req.body.squares = squaresPreSet();
        console.log(req.body);
        db.Game.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    });



    
}