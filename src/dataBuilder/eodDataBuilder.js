import QuandlQuery from '../quandl/quandlQuery'
import TimeSeriesData from '../db/sortedSet'
import KeyValue from '../db/keyValue'
import EodData from '../model/eodData'
var DateFormat = require('dateformat')
//require('babel-polyfill')

const EOD_TS_SUFFIX = ":EOD:TS"

/**
 * Class to save EOD data from Quandl
 * 
 * @export
 * @class EodDataSaver
 */
export default class EodDataBuilder {
    constructor() {

    }

    /**
     * Saves qandl eod results for the given dataset to Redis database
     * @param {any} dataset_code  quandl dataset code
     * @returns string message
     * @memberof EodDataSaver
     */
    async save(dataset_code) {
        let qQuery = new QuandlQuery()
        let data = await qQuery.get("EOD", dataset_code);
        _insertData(data);
        return "Saved"
    }

    _insertData(data) {
        let tsData = new TimeSeriesData();
        let kv = new KeyValue();
        let header = data.dataset.column_names;
        let keyIdx = header.indexOf("Date");
        let openIdx = header.indexOf("Open");
        let highIdx = header.indexOf("High");
        let lowIdx = header.indexOf("Low");
        let closeIdx = header.indexOf("Close");
        let volumeIdx = header.indexOf("Volume");
        let dividentIdx = header.indexOf("Divident");
        let splitIdx = header.indexOf("Split");

        let dataArray = data.dataset.data;
        for (let row of dataArray) {
            let eodData = new EodData(
                row[keyIdx],
                row[openIdx],
                row[highIdx],
                row[lowIdx],
                row[closeIdx],
                row[volumeIdx],
                ow[dividentIdx],
                row[splitIdx]);

            tsData.insert(dataset_code + EOD_TS_SUFFIX, DateFormat(row[keyIdx], "yyyymmdd"), JSON.stringify(eodData))
        }
    }


    /** Gets all data from redis for a sorted set. Identified by dataset_name
     * @param {any} dataset_code dataset code from qundl
     * @returns Json results
     * @memberof EodDataOps
     */
    async get(dataset_code) {
        let tsData = new TimeSeriesData();
        let kv = new KeyValue();
        let data = await tsData.get(dataset_code + EOD_TS_SUFFIX);
        return data;
    }
}

