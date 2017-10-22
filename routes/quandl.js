
var router = require('express').Router();
import QuandlQuery from '../src/quandl/quandlQuery';

var quandlQuery = new QuandlQuery();

router.get('/get/EOD', function (req, res, next) {

    var result = quandlQuery.get("EOD", req.query.dataset_code, ".json");
    result.then(function (data) {
        res.send(data);
    })

})

module.exports = router;