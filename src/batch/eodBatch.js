
import TimeSeriesData from '../db/sortedSet'
import KeyValue from '../db/keyValue'
import RedisList from '../db/list'
import QuandlQuery from '../quandl/quandlQuery'
import EodDataBuilder from '../dataBuilder/eodDataBuilder'

var eodBuilder = new EodDataBuilder();
function runEodToRedisBatch() {
    var tickers = await getTickers();
    var data = await getQuandlData('MSFT')
    eodBuilder._insertData(data);
}

async function getTickers() {
    let list = new RedisList();
    let tickers = await list.get("TICKER");
    console.log('Fetched tickers from redis')
    return tickers;
}

async function getQuandlData(dataset_code) {
    let qQuery = new QuandlQuery();
    let data = await qQuery.get("WIKI", dataset_code);
    console.log('Fetched from quandl')
    return data;
}