var conf = require('../../conf');
var Promise = require('promise');

// 工具类
var common = {};

// 判断字符串是否为空
common.isBlank = function(obj) {
    if(obj=='' || obj==null || obj==undefined) {
        return true;
    }
    return false;
}

// 导出模块
module.exports = common;