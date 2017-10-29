import QuandlQuery from '../quandl/quandlQuery'
import TimeSeriesData from '../db/sortedSet'
import KeyValue from '../db/keyValue'
var DateFormat = require('dateformat')

const KEYFORMAT_DATA = "WIKI:TS:DATA"
const KEYFORMAT_HEADER = "WIKI:TS:HEADER"


/**
 * Class to save EOD data from Quandl
 * 
 * @export
 * @class EodDataSaver
 */
export default class WikiDataBuilder {
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

        let eodResultPromise = qQuery.get("WIKI", dataset_code);

        let newDataIsSaved = new Promise(
            function (resolve, reject) {
                try {
                    eodResultPromise.then(function (data) {
                        let tsData = new TimeSeriesData();
                        let kv = new KeyValue();
                        let header = data.column_names;
                        let keyIdx = header.indexOf("Date")
                        let dataArray = data.data;
                        for (let row of dataArray) {
                            tsData.insert(dataset_code + this.KEYFORMAT_DATA, DateFormat(row[keyIdx], "yyyymmdd"), JSON.stringify(row))
                        }
                        //now set the header as well
                        kv.insert(dataset_code + this.KEYFORMAT_HEADER, JSON.stringify(header));

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
        let tsData = new TimeSeriesData();
        let kv = new KeyValue();

        let isDataFetched = new Promise((resolve, reject) => {
            try {
                tsData.get(dataset_code + this.KEYFORMAT_DATA).then(data => {
                    kv.get(dataset_code + this.KEYFORMAT_HEADER).then((header => {
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

