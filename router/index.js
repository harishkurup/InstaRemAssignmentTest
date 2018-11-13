'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
/* GET home page. */
const dataDumpClass = require('../controllers/fileDataDumpController/index');
const battleDataClass = require('../controllers/battleController/index');
router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, "../index.html"));
});

router.post('/upload', function (req, res) {
    try {
        let dataDumpObj = new dataDumpClass();
        dataDumpObj.init(req.files.file).then(data => {
            res.status(200);
            res.send(data);
        }, err => {
            res.status(err.status);
            res.send(err.message);
        }).catch(err => {
            res.status(err.status);
            res.send(err.message);
        })
    } catch (error) {
        res.status(error.status);
        res.send(error.message);
    }
});

router.get('/list', function (req, res) {
    try {
        let battleDataObj = new battleDataClass();
        battleDataObj.battleLocationList().then(data => {
            res.status(200);
            res.send(data);
        }, err => {
            res.status(err.status);
            res.send(err.message);
        }).catch(err => {
            res.status(err.status);
            res.send(err.message);
        })
    } catch (error) {
        res.status(error.status);
        res.send(error.message);
    }
});
module.exports = router;