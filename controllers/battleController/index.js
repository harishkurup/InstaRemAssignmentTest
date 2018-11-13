/* Comment By: Shorya Saxena
   DESC: 
   Bussiness Logic
*/
const battleProcessClass = require('./battleDataProcess');
class BattleDetails {
    constructor() {
        let self = this;
        this.battleProcessObj = new battleProcessClass();
    }
    init() {

    }

    battleLocationList() {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = {}
            let filterQuery = { _id: 0, location: 1, name: 1 }
            self.battleProcessObj.listBattleData(queryData, filterQuery)
                .then(battleData => {
                    battleData.forEach((element, index, object) => {
                        if (element.location == null || element.location == '') {
                            object.splice(index, 1);
                        }
                    });
                    resolve(battleData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
}
module.exports = BattleDetails;