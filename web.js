const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); //Providing a Connect/Express middleware that can be used to enable CORS
//require('dotenv/config'); //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
const dotenv = require('dotenv');
dotenv.config();

const testRoutes = require('./api/routes/testRoutes');
const backupRoutes = require('./api/routes/backupRoutes');
const importRoutes = require('./api/routes/importRoutes');

app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/test', testRoutes)
app.use('/backup', backupRoutes);
app.use('/import', importRoutes);

app.get('/', (req, res) => {
    res.send('IN CONSTRUCTION...');
})

//connect to DB
mongoose.connect(
    process.env.MONGODB_URI, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connect to db')
);

port = process.env.PORT || 3000;

app.listen(port);

console.log('sf-mongodb RESTful API server started on port: ' + port);