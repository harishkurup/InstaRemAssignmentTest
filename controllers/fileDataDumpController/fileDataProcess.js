/* Comment By: Shorya Saxena
   DESC: This component will be used to convert file Data to Json data
   Bussiness Logic
*/
'use strict';
const csv = require('fast-csv');
class fileDataProcessClass {
    constructor() {

    }
    processData(fileData) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.readFileData(fileData)
                .then(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    readFileData(fileData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let dataArray = [];
            csv.fromString(fileData.data,
                {
                    headers: false
                })
                // .transform(function(data){
                //     return data.reverse(); //reverse each row. 
                // })
                .on("data", function (data) {
                    dataArray.push(data)
                })
                .on("end", function () {
                    resolve(dataArray)
                });
        });
    }
}
module.exports = fileDataProcessClass;