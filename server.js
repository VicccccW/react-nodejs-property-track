const express = require('express');
const session = require('express-session');
require('dotenv').config();
const RedisStore = require('connect-redis')(session);
const redisClient = require('./server/redisClient');
const mongoose = require('mongoose');
const postgresqlPool = require('./server/postgresDB/pool');
const cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors'); //providing a Connect/Express middleware that can be used to enable CORS
const app = express();
const fs = require('fs'); //use in https dev mode
const https = require('https'); //use in https dev mode

//production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
} else if (process.env.NODE_ENV === 'development') {
    app.use('/', express.static(path.join(__dirname, '/client/public')));
}

//setup port
const port = process.env.PORT || 9000;

redisClient.on('connect', () => console.log('Connecting to Redis...'));
//if receive err, make sure you have your redis server running locally
redisClient.on('error', err => console.log('Redis Connecton Error ' + err));

//connet to postgresql
postgresqlPool.on('connect', client => {
    console.log('Connecting to postgresql...');
});

postgresqlPool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

//connect to mongoDB
mongoose.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connecting to mongoDB...')
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

//initialize session
//60 * 60 * 1000 is 1 hour
const sessionHandler = session({
    store: new RedisStore({ client: redisClient }),
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: { secure: process.env.ISHTTPS === 'true', maxAge: 60 * 30 * 1000 },
    resave: false,
    saveUninitialized: false
});

//in order to use cookie in Heroku, we need to set proxy
app.set('trust proxy', 1);

//use sessionMiddlware (app.use) before using session.
//the express session uses cookies, so the cookie object needs to be present before it can use the session.
app.use(sessionHandler);

//define route
const apiRoutes = require('./server/routes/apiRoutes');
app.use('/api', sessionHandler, apiRoutes);

//the "catchall" handler: for any request that doesn't
//match api router above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});




// //for https dev mode
// https.createServer({
//     key: fs.readFileSync(path.resolve(__dirname, 'cert/server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname, 'cert/server.crt'))
// }, app).listen(port, () => console.log('API server listening on port: ' + port));
app.listen(port, () => console.log('API server listening on port: ' + port));