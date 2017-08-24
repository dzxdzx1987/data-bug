let express = require('express');
let router = express.Router();

let grab = require('../services/grab');

router.all('/request', (req, res, next) => {
    grab.doGrab(req, res, next);
});

module.exports = router;