const express = require('express');
const session = require('express-session');
const redis = require('redis')
//const RedisStore = require('connect-redis')(session);
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors'); //Providing a Connect/Express middleware that can be used to enable CORS
const app = express();
const fs = require('fs')
const https = require('https');
require('dotenv').config();

//production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
} else if (process.env.NODE_ENV === 'development') {
    app.use('/', express.static(path.join(__dirname, '/client/public')));
}

// //setup port constants
// const port_redis = process.env.PORT || 6379;
// const port = process.env.PORT || 9000;

// //configure redis client on port 6379
// const redis_client = redis.createClient(port_redis);

// const redisClient = redis.createClient('6379', 'localhost');
// redisClient.on('connect', () => console.log('Redis client connected'));
// redisClient.on('error', () => console.log('Something went wrong ' + err));

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initialize session
const sessionHandler = session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: { secure: process.env.ISHTTPS === 'true' },
    resave: false,
    saveUninitialized: false
});
//    store: new RedisStore({ client: redisClient }),
// store:
//     process.env.NODE_ENV === 'production'
//         ? new RedisStore({
//             url: process.env.REDIS_URL
//         })
//         : new RedisStore(),

//use sessionMiddlware (app.use) before using session.
app.use(sessionHandler);

//define route
const apiRoutes = require('./server/routes/apiRoutes');
app.use('/api', sessionHandler, apiRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//connect to DB
mongoose.connect(
    process.env.MONGODB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connecting to db')
);

// https.createServer({
//     key: fs.readFileSync(path.resolve(__dirname, 'cert/server.key')),
//     cert: fs.readFileSync(path.resolve(__dirname, 'cert/server.crt'))
// }, app).listen(port, () => console.log('API server listening on port: ' + port));
app.listen(port, () => console.log('API server listening on port: ' + port));