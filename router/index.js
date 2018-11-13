'use strict';
const express = require('express');
const router = express.Router(); 
const path=require('path');
/* GET home page. */
const dataDumpClass = require('../controllers/fileDataDumpController/index');
router.get('/', (req, res) => {
 
    res.sendFile(path.join(__dirname,"../index.html"));
});

router.post('/upload', function(req, res) {
    try {
        let dataDumpObj = new dataDumpClass();
        dataDumpObj.init(req.files.file).then(data => {
            res.status(200);
            res.send(data);
        }, err => {
            res.status(error.status);
            res.send(error.message);
        }).catch(err => {
            res.status(error.status);
            res.send(error.message);
        })
    } catch (error) {
        res.status(error.status);
        res.send(error.message);
    }
  });
router.get('/data-dump', function (req, res) {

});
module.exports = router;