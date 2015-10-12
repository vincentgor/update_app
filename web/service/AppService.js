var appDao = require('../dao/AppDao');

var appService = {};

// 保存
appService.save = function(obj, connection) {
    return appDao.save(obj, connection);
};

// 获取分页数据
appService.getByPage = function(pageIndex, pageSize, orderby) {
    if(!orderby) {
        orderby = ' id';   // 默认id顺序
    }
    return appDao.getByPage(pageIndex, pageSize, orderby);
};

// 最新版
appService.getTop = function(app_name) {
    return appDao.getTop(app_name);
};

// 导出模块
module.exports = appDao;