'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
var http = require('http');
const app = express();
const fileUpload = require('express-fileupload');
let server, options;
let index = require('./router/index');//routing
let config = require('./configuration');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
require('./cacheDb/mongoDb');//connection to mongodb
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use('/connector', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`Express Server started listening on port ${config.port}`)
});
module.exports = app;