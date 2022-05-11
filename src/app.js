const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const db = require ('./config/db/mongodb')
const siteController = require('./app/controllers/SiteController');

app.use(express.static(path.join(__dirname, 'src')));
// DB Connection
db.connect();
//HTTP Logger
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

siteController.index;


