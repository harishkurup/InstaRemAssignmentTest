'use strict';
const fileDataProcessClass = require('./fileDataProcess');
class fileDataClass {
    constructor() {
        let self = this;
        this.fileDataProcessObj = new fileDataProcessClass();
    }
    init(fileData) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.fileDataProcessObj.processData(fileData).then(data => {
                resolve(data);
            }, err => {
                reject(err);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
module.exports = fileDataClass;