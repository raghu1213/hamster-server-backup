var router = require('express').Router();
import RedisHelper from '../src/db/redisHelper';
import MongoClient from '../src/db/mongo/mongoConnection';


//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/eod/insert
router.get('/redis', function (req, res, next) {
    let redis = new RedisHelper();
    redis.testConnection().then((status) => {
        res.send(status);
    })

});

router.get('/mongo', function (req, res, next) {
    //let mongoClient = new MongoClient();
    res.send(MongoClient());
});




module.exports = router;
