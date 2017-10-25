var router = require('express').Router();
import EodDataBuilder from '../src/dataBuilder/eodDataBuilder'


//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/eod/insert?dataset_code=MSFT
router.post('/insert', function (req, res, next) {
    let eod = new EodDataBuilder();
    eod.save(req.query.dataset_code).then(function (result) {
        res.send(result + "-Key:" + req.query.dataset_code);
    });
});

//gets saved data from database
//e.g. http://localhost:3000/eod/get?dataset_code=MSFT
router.get('/get', (req, res, next) => {
    let eod = new EodDataBuilder();
    eod.get(req.query.dataset_code).then((result) => {
        res.send(JSON.stringify(result));
    });
});


module.exports = router;
