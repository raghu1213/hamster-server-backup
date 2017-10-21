var router = require('express').Router();
import EodSaver from '../src/db/eodDataSaver'


router.post('/insert/EOD', function (req, res, next) {
    var eodSaver = new EodSaver();
    eodSaver.save(req.query.dataset_code).then(function (result) {
        res.send(result + "Key:" + req.query.dataset_code);
    });
    
});

module.exports = router;
