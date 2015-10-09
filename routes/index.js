var express = require('express');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'hello, 粑粑' });
});

/* 最新的版本号 */
router.get('/latest', function(req, res, next) {
    var latest = '1.2.4';
    var url = 'https://update-app-vincent-gor-1.c9.io/version/qq_1.2.4.apk';
    console.log('查询最新版本');
    res.json({ret_code: 0, version: latest, url: url});
});

module.exports = router;