// configs/session.config.js

// require session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = app => {
    // <== app is just a placeholder here
    // but will become a real "app" in the app.js
    // when this file gets imported/required there

    // use session
    app.use(
        session({
            secret: 'hdkjfldfkmdfkmdfl',
            resave: false,
            saveUninitialized: true,
            //cookie: { maxAge: 60000 } // 60 * 1000 ms === 1 min - pas obligatoire
            store: new MongoStore({
                // <== ADDED !!!
                mongooseConnection: mongoose.connection,
                // ttl => time to live
                ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
            })
        })
    );
};