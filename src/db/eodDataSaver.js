import QuandlQuery from '../quandl/quandlQuery'
import RedisHelper from '../redis/redisHelper'
var DateFormat = require('dateformat')

export default class EodDataSaver {
    constructor() {

    }
    save(dataset_code) {
        var qQuery = new QuandlQuery()
        var data = qQuery.get("EOD", dataset_code , ".json")
        var redisHelper = new RedisHelper();
        var header = data.dataset.column_names;
        var keyIdx = header.indexOf("Date")
        for (let row of data) {
            redisHelper.insertIntoSortedSet(req.query.dataset_code, DateFormat(row[keyIdx], "yyyymmdd"), JSON.stringify(row))
        }
    }

}



// router.get('/insert', function (req, res, next) {
//     client.get("https://www.quandl.com/api/v3/datasets/EOD/MSFT.json?api_key=" + apiKey, function (data, response) {
//         for (let obj of data.dataset.data) {
//             var date = new Date(obj[0])
//             var formattedDate = dateFormat(date, "ddmmyyyy");
//             redisClient.zadd('MSFT', formattedDate, JSON.stringify(obj));
//         }
//         res.send(JSON.stringify(data.dataset.data))
//     })
// })

// router.get('/redistest', function (req, res, next) {
//     redisClient.set('test', 123);
//     redisClient.get('test', function (err, result) {
//         console.log('writing result')
//         console.log(result);
//         res.send(result)
//     })
// })