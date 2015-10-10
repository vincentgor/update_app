var express = require('express');
var router = express.Router();

var appService = require('../service/AppService');

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

/* 最新的版本号 */
router.get('/last', function(req, res, next) {
    
    appService.getTop().then(function(result) {
        result.url = req.protocol+ '://' +req.hostname + '/version/'+result.apk_name;
        res.json({ret_code: 0, data: result});
    }, function(err) {
        res.json({ret_code: -1, err: err});
    });

});

module.exports = router;