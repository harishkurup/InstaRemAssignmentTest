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
                        if (element.location == null || element.location == '') {//will remove the null data
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


    battleStatsData() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.battleStatsMostActiveData()////will fetch attacker_king,defender_king,region and name data
                .then(self.battleStatsAttackerOutcomeData.bind(self))////will fetch win and loss data
                .then(self.battleTypeData.bind(self))//will fetch unique battledata
                .then(self.battleStatsDefenderSize.bind(self))//will fetch unique battledata
                .then(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });

    }

    battleStatsMostActiveData() {
        let self = this;
        return new Promise((resolve, reject) => {

            self.battleStatsAttackerKingActiveData()
                .then(self.battleStatsDefenderKingActiveData.bind(self))
                .then(self.battleStatsRegionActiveData.bind(self))
                .then(self.battleStatsNameActiveData.bind(self))
                .then(data => {
                    resolve({
                        'most_active': data
                    });
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    battleStatsAttackerKingActiveData() {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                { $group: { _id: { attacker_king: "$attacker_king" }, count: { $sum: 1 } } },
                { $match: { count: { "$gt": 1 } } },
                { $sort: { count: -1 } },
                { $limit: 1 }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    resolve({ attacker_king: data[0] });
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    battleStatsDefenderKingActiveData(statsActiveData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                { $group: { _id: { defender_king: "$defender_king" }, count: { $sum: 1 } } },
                { $match: { count: { "$gt": 1 } } },
                { $sort: { count: -1 } },
                { $limit: 1 }];
            let respData;
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    respData = Object.assign(statsActiveData, { defender_king: data[0] });
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    battleStatsRegionActiveData(statsActiveData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                { $group: { _id: { region: "$region" }, count: { $sum: 1 } } },
                { $match: { count: { "$gt": 1 } } },
                { $sort: { count: -1 } },
                { $limit: 1 }];
            let respData;
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    respData = Object.assign(statsActiveData, { region: data[0] })
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    battleStatsNameActiveData(statsActiveData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                { $group: { _id: { name: "$name" }, count: { $sum: 1 } } },
                { $match: { count: { "$gt": 1 } } },
                { $sort: { count: -1 } },
                { $limit: 1 }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    let respData;
                    respData = Object.assign(statsActiveData, { name: data[0] })
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    battleStatsAttackerOutcomeData(statsData) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.battleStatsMaxData()
                .then(self.battleStatsMinData.bind(self))
                .then(data => {
                    let respData;
                    respData = Object.assign(statsData, { attacker_outcome: data })
                    resolve(respData);
                    resolve(data);
                }, err => {
                    reject(data);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    battleStatsMaxData() {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                { $match: { "attacker_outcome": "win" } },
                {
                    $group: {
                        _id: "$attacker_outcome",
                        count: { $sum: 1 }
                    }
                }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    resolve({ max: data[0] });
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    battleStatsMinData(statsAttackerData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                { $match: { "attacker_outcome": "loss" } },
                {
                    $group: {
                        _id: "$attacker_outcome",
                        count: { $sum: 1 }
                    }
                }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    let respData;
                    respData = Object.assign(statsAttackerData, { min: data[0] })
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    battleTypeData(statsData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = "battle_type";
            self.battleProcessObj.statsDistinctData(queryData)
                .then(data => {
                    let respData;
                    respData = Object.assign(statsData, { 'battle_type': data })
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    battleStatsDefenderSize(statsData) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.defenderAverageData()
                .then(self.defenderMinData.bind(self))
                .then(self.defenderMaxData.bind(self))
                .then(data => {
                    let respData;
                    respData = Object.assign(statsData, { defender_size: data });
                    resolve(respData);
                    resolve(data);
                }, err => {
                    reject(data);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    defenderAverageData() {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                {
                    $group: {
                        _id: null,
                        avgData: { $avg: "$attacker_size" }
                    }
                }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    resolve({ average: data[0]['avgData'] });
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    defenderMinData(defenderData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                {
                    $group: {
                        _id: 'attacker_size',
                        minData: { $min: "$attacker_size" }
                    }
                }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    let respData;
                    respData = Object.assign(defenderData, { min: data[0]['minData'] });
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
    defenderMaxData(defenderData) {
        let self = this;
        return new Promise((resolve, reject) => {
            let queryData = [
                {
                    $group: {
                        _id: 'attacker_size',
                        maxData: { $max: "$attacker_size" }
                    }
                }];
            self.battleProcessObj.statsAggregateData(queryData)
                .then(data => {
                    let respData;
                    respData = Object.assign(defenderData, { min: data[0]['maxData'] });
                    resolve(respData);
                }, err => {
                    reject(err);
                }).catch(err => {
                    reject(err);
                });
        });
    }
}
module.exports = BattleDetails;