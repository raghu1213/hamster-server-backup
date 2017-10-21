import QuandlQuery from '../quandl/quandlQuery'
import RedisHelper from '../redis/redisHelper'
var DateFormat = require('dateformat')

export default class EodDataSaver {
    constructor() {

    }
    save(dataset_code) {
        var qQuery = new QuandlQuery()
        var data;

        var eodResultPromise = qQuery.get("EOD", dataset_code);

        // Promise
        var newDataIsSaved = new Promise(
            function (resolve, reject) {
                try {
                    eodResultPromise.then(function (data) {
                        var redisHelper = new RedisHelper();
                        var header = data.dataset.column_names;
                        var keyIdx = header.indexOf("Date")
                        var dataArray = data.dataset.data;
                        for (let row of dataArray) {
                            redisHelper.insertIntoSortedSet(dataset_code, DateFormat(row[keyIdx], "yyyymmdd"), JSON.stringify(row))
                        }
                        resolve("Success");
                    });

                }
                catch (err) {
                    reject("Error while saving to redis :" + err.message); // reject
                }
            });

        return newDataIsSaved;
        // eodResultPromise.then(function (data) {
        //     var redisHelper = new RedisHelper();
        //     var header = data.dataset.column_names;
        //     var keyIdx = header.indexOf("Date")
        //     var dataArray = JSON.parse(data);
        //     for (let row of dataArray) {
        //         redisHelper.insertIntoSortedSet(req.query.dataset_code, DateFormat(row[keyIdx], "yyyymmdd"), JSON.stringify(row))
        //     }
        // })

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