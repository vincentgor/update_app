var express = require('express');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'hello, 粑粑' });
});

/* 最新的版本号 */
router.get('/latest', function(req, res, next) {
    var latest = '1.2';
    var apk_name = 'Laugh.apk';
    var url = 'https://update-app-vincent-gor-1.c9.io/version/' + apk_name;
    var update_msg = "新增X功能，修复了Ybug";
    console.log('查询最新版本');
    res.json({ret_code: 0, version: latest, url: url, update_msg: update_msg, apk_name: apk_name});
});

module.exports = router;