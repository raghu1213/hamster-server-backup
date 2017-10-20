var router = require('express').Router();
import RedisHelper from '../src/redis/redisHelper'

var redisHelper = new RedisHelper();
router.get('/get/EOD', function (req, res, next) {
    res.send(redisHelper.getAllFromSortedSet(req.query.dataset_code));
});

module.exports = router;