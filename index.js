const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./models')
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./services/passport');

///////////////
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
//////////////

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:3000/ in your browser.`);
});