/* Comment By: Shorya Saxena
   DESC: 
   Bussiness Logic
*/
let battleModel = require('../../models/battles');
class BattleDataProcess {
    constructor() {

    }

    listBattleData(query,filterQuery) {
        return new Promise((resolve, reject) => {
            battleModel.find(query,filterQuery, (err, data) => {
                resolve(data);
            });
        });
    }
}
module.exports = BattleDataProcess;