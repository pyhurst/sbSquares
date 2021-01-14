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


require("./utils/socketConnection")(io);


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.io = io;

require('./routes/authRoutes')(app);
require('./routes/gameRoutes')(app);

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:3000/ in your browser.`);
});