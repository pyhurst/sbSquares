const db = require('../models');

module.exports = app => {
    
    app.post('/api/game/create/', (req, res) => {
        // console.log(req)
        console.log(req.body);
        db.Game.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    });

    
}