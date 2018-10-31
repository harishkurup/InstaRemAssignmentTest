'use strict';
var express = require('express');
let router = express.Router();
const guid = require('guid');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'instaRem-1.0.0' });
});


module.exports = router;