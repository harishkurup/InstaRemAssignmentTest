/* Comment By: Shorya Saxena
    DESC: This component will be used to dump data to mongo
    Application Logic
*/
'use strict';
const Promise = require('bluebird');
const fileDataProcessClass = require('./fileDataProcess');
let battles = require('../../models/battles');
class fileDataClass {
    constructor() {
        let self = this;
        this.fileDataProcessObj = new fileDataProcessClass();
    }
    init(fileData) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.fileDataProcessObj.processData(fileData)
                .then(self.dumpJsonData.bind(this))
                .then(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    dumpJsonData(JsonData) {
        let self = this;
        return new Promise((resolve, reject) => {
            Promise.mapSeries(JsonData, function (obj) {
                return function () {//creating closure to retian values in vairable
                    return new Promise(function (inresolve, inreject) {
                        let battleData = new battles({
                            name: obj[0],
                            year: obj[1],
                            battle_number: obj[2],
                            attacker_king: obj[3],
                            defender_king: obj[4],
                            attacker_1: obj[5],
                            attacker_2: obj[6],
                            attacker_3: obj[7],
                            attacker_4: obj[8],
                            defender_1: obj[9],
                            defender_2: obj[10],
                            defender_3: obj[11],
                            defender_4: obj[12],
                            attacker_outcome: obj[13],
                            battle_type: obj[14],
                            major_death: obj[15],
                            major_capture: obj[16],
                            attacker_size: obj[17],
                            defender_size: obj[18],
                            attacker_commander: obj[19],
                            defender_commander: obj[20],
                            summer: obj[21],
                            location: obj[22],
                            region: obj[23],
                            note: obj[24]
                        });
                        battleData.save(function (err) {
                            if (err) {
                                inreject('Please try again'); return;
                            }
                            inresolve(`Data Uploaded Succesfully for name ${obj[0]}`)
                        });
                    });
                }();
            }, {
                    concurrency: 4
                }).then(function (dynamicData) {
                    resolve(dynamicData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
}
module.exports = fileDataClass;