import QuandlQuery from '../quandl/quandlQuery'
import RedisHelper from './redis/redisHelper'
var DateFormat = require('dateformat')


/**
 * Class to save EOD data from Quandl
 * 
 * @export
 * @class EodDataSaver
 */
export default class EodDataOps {
    constructor() {

    }

    /**
     * Saves qandl eod results for the given dataset to Redis database
     * @param {any} dataset_code  quandl dataset code
     * @returns string message
     * @memberof EodDataSaver
     */
    save(dataset_code) {
        let qQuery = new QuandlQuery()
        let data;

        let eodResultPromise = qQuery.get("EOD", dataset_code);

        let newDataIsSaved = new Promise(
            function (resolve, reject) {
                try {
                    eodResultPromise.then(function (data) {
                        let redisHelper = new RedisHelper();
                        let header = data.dataset.column_names;
                        let keyIdx = header.indexOf("Date")
                        let dataArray = data.dataset.data;
                        for (let row of dataArray) {
                            redisHelper.insertIntoSortedSet(dataset_code, DateFormat(row[keyIdx], "yyyymmdd"), JSON.stringify(row))
                        }

                        //now set the header as well
                        redisHelper.SetDataSetHeaders(dataset_code, JSON.stringify(header));

                        resolve("Success");
                    });

                }
                catch (err) {
                    reject("Error while saving to redis :" + err.message); // reject
                }
            });
        return newDataIsSaved;
    }


    /** Gets all data from redis for a sorted set. Identified by dataset_name
     * @param {any} dataset_code dataset code from qundl
     * @returns Json results
     * @memberof EodDataOps
     */
    get(dataset_code) {
        let redisHelper = new RedisHelper();
        let isDataFetched = new Promise((resolve, reject) => {
            try {
                redisHelper.getAllFromSortedSet(dataset_code).then(data => {
                    redisHelper.GetDataSetHeader(dataset_code).then((header => {
                        resolve({ Header: header, Data: data });
                    }));
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return isDataFetched;
    }
}

