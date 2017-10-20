var router = require('express').Router();
import EodSaver from '../src/db/eodDataSaver'


router.post('/insert/EOD', function (req, res, next) {
    var eodSaver = new EodSaver();
    eodSaver.save(req.query.dataset_code);
    res.send("Success. Key:" + req.query.dataset_code)
});

module.exports = router;
