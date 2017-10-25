var router = require('express').Router();
const PLACEHOLDER_STRING = "Security placeholder";


//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/eod/insert
router.post('/insert', function (req, res, next) {
    res.send(PLACEHOLDER_STRING)
});

//gets saved data from database
//e.g. http://localhost:3000/eod/get
router.get('/get', (req, res, next) => {
    res.send(PLACEHOLDER_STRING)
});


module.exports = router;
