var router = require('express').Router();
import EodDataBuilder from '../src/dataBuilder/eodDataBuilder'


//insertes EOD data in Redis database base don the dataset_code provided
//http://localhost:3000/eod/insert?dataset_code=MSFT
router.post('/insert', async function (req, res, next) {
    let eod = new EodDataBuilder();
    let result = await eod.save(req.query.dataset_code);
    res.send(result + "-Key:" + req.query.dataset_code);

});

//gets saved data from database
//e.g. http://localhost:3000/eod/get?dataset_code=MSFT
router.get('/get', async (req, res, next) => {
    let eod = new EodDataBuilder();
    let result = await eod.get(req.query.dataset_code);
    res.send(JSON.stringify(result));
});


module.exports = router;
