'use strict';

const os = require('os');
const path = require('path');
let env = process.env;
let envType = process.env.NODE_ENV || "stage";
let config =
{
    development: {
    },
    stage: {
    },
    common: {
        tempfolder: os.tmpdir(),
    }

};
module.exports = Object.assign(config[envType], config['common']);
