var router = require('express').Router();
import RedisHelper from '../src/db/redisHelper'



//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/eod/insert
router.get('/redis', function (req, res, next) {
    let redis = new RedisHelper();
    redis.testConnection().then((status) => {
        res.send(status);
    })
   
});




module.exports = router;
