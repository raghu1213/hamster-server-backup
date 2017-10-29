var router = require('express').Router();
import WikiDataBuilder from '../src/dataBuilder/wikiDataBuilder'


//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/wiki/insert?dataset_code=MSFT
router.post('/insert', function (req, res, next) {
    let eod = new WikiDataBuilder();
    eod.save(req.query.dataset_code).then(function (result) {
        res.send(result + "-Key:" + req.query.dataset_code);
    });
});

//gets saved data from database
//e.g. http://localhost:3000/wiki/get?dataset_code=MSFT
router.get('/get', (req, res, next) => {
    let eod = new WikiDataBuilder();
    eod.get(req.query.dataset_code).then((result) => {
        res.send(JSON.stringify(result));
    });
});


module.exports = router;
