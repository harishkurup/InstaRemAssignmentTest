'use strict';
var csv = require('fast-csv');
class fileDataProcessClass {
    constructor() {

    }
    processData(fileData) {
        return new Promise((resolve, reject) => {
            let authors=[];
            csv
                .fromString(authorFile.data.toString(), {
                    headers: true,
                    ignoreEmpty: true
                })
                .on("data", function (data) {
                    data['_id'] = new mongoose.Types.ObjectId();

                    authors.push(data);
                })
                .on("end", function () {
                    console.log(authors)
                });

        });
    }
}
module.exports = fileDataProcessClass;