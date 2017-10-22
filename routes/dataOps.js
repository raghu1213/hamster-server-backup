var router = require('express').Router();
import EodOps from '../src/db/eodDataOps'


//insertes EOD data in Redis database base don the dataset_code provided
router.post('/insert/EOD', function (req, res, next) {
    let eodOps = new EodOps();
    eodOps.save(req.query.dataset_code).then(function (result) {
        res.send(result + "-Key:" + req.query.dataset_code);
    });
});

//gets saved data from database
router.get('/get/EOD', (req, res, next) => {
    let eodOps = new EodOps();
    eodOps.get(req.query.dataset_code).then((result) => {
        res.send(JSON.stringify(result));
    });
});


module.exports = router;
