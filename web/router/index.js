var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

var conf = require('../../conf');
var appService = require('../service/AppService');

/* 首页 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'hello, 粑粑' });
});

/* 最新的版本号 */
router.get('/latest', function(req, res, next) {
    var latest = '1.0';
    var apk_name = 'RecruitPlatform.apk';
    var url = req.protocol+ '://' +req.hostname + '/version/' + apk_name;
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

/* 上传apk */
router.post('/upload', function(req, res, next) {
    
    var version = req.body.version || 3;
    var subversion = req.body.subversion || 4;
    console.log('version' + version);
    console.log('subversion' + subversion);
    
    if(version=='' || subversion=='' || version==undefined || subversion==undefined) {
        res.json({ret_code: -1, err: '缺少参数'});
        return;
    }
    
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';    // 编码
    form.uploadDir = conf.main.projectDir + conf.main.fileUploadPath;   //上传路径
    console.log(form.uploadDir);
    form.keepExtensions = true;	 //保留后缀
    
    form.parse(req, function(err, fields, files) {
        console.log('21323123');
        if(err) {
            console.error(err);
            res.json({ret_code: -1, err: err});
            return;
        }
        
        // 移动文件
        var realName = files.app.name;
        realName = replaceLastStr(realName, '.', '_' + version + '.' + subversion + '.');
        var realPath = conf.main.projectDir + conf.main.fileUploadPath + realName;
        console.log(realPath);
        fs.renameSync(files.app.path, realPath);  //重命名
        
        console.log('received upload:\n\n');
        var url = req.protocol+ '://' +req.hostname + '/version/' + realName;
        var data = {url: url};
        res.json({ret_code: 0, data: data});
    });

});

// 替换最后一个字符串,如： sample.apk---> sample_2.3.akp
var replaceLastStr = function(sourceStr, sourceSubStr, destSubStr) {
    var pos = sourceStr.lastIndexOf(sourceSubStr);
    var retStr = sourceStr.substring(0, pos) + destSubStr + sourceStr.substring(pos+1, sourceStr.length);
    console.log('改造后的字符串为： ' + retStr);
    return retStr;
}

module.exports = router;