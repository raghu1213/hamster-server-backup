
var router = require('express').Router();
import QuandlQuery from '../src/quandl/quandlQuery';

var quandlQuery = new QuandlQuery();

router.get('/fetch/EOD', function (req, res, next) {

    var result = quandlQuery.get("EOD", req.query.dataset_code, ".json");
    res.send(JSON.stringify(result));
})

module.exports = router;