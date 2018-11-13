'use strict';
const mongoose = require('mongoose');

let credentials = {
    // username: 'instaRem',
    // password: 'instaRem123',
    hostname: '127.0.0.1',
    port: '27017',
    dbname: 'instaRem'
}

mongoose.connect(
    `mongodb://${credentials.hostname}:${credentials.port}/${credentials.dbname}`, { useNewUrlParser: true })
    .then(db => {
        console.log(`MongoDb: connected mongodb://${credentials.hostname}:${credentials.port}/${credentials.dbname}`);
    }, err => {
        console.log("MongoDb : err----------->" + err)
    }).catch(err => {
        console.log('MongoDb: catch', err)
    });