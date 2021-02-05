const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const db = require('./models')
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./services/passport');


const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


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

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.io = io;

require('./routes/authRoutes')(app);
require('./routes/gameRoutes')(app);
require('./routes/chatRoutes')(app);


app.use((req, res) => {
    switch (process.env.NODE_ENV) {
        case 'dev':
            res.sendFile(path.join(__dirname, './client/public/index.html'))
            break;
        case 'production':
            res.sendFile(path.join(__dirname, "./client/build/index.html"));
        default:
            break;
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:3000/ in your browser.`);
});