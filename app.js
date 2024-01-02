const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = [process.env.DH, process.env.HD];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      });
    }
    next();
});

const bannerRoute = require('./route');

app.use(`/banner`, bannerRoute);

const port = process.env.PORT;
const DB_URL = process.env.MONGO_URL;

mongoose
    .connect(DB_URL, {
        dbName: 'pop-up_db'
    })
    .then(() => {
        console.log('database connection successful');
    })
    .catch((err) => {
        console.error('database connection error', err);
    });
    
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});