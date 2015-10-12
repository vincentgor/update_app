var db = require('../../utils/mysqlDb');
var Promise = require('promise');

var defaultTable = 't_app';

var appDao = {};

// 获取分页数据
appDao.getByPage = function(pageIndex, pageSize, orderby) {
    return new Promise(function(fulfill, reject) {
        var sql = 'select * from ' +  defaultTable;
        sql += 'where 1=1 ';
        sql+=' order by ' + orderby;
        // 最少也要第一页吧
        if(pageIndex <= 0) {
            pageIndex = 1;
        }
        pageIndex = pageIndex?pageIndex:1;
        pageSize = pageSize?pageSize:10;
        sql += ' limit ';
        sql += (pageIndex - 1) * pageSize;
        sql +=',';
        sql +=pageSize;
        
        db.query(sql).then(function(rows) {
            fulfill(rows);
        }, function(err) {
            reject(err);
        });
    });
};

// 保存数据
appDao.save = function(obj, connection) {
    var sql = 'insert into  ' + defaultTable;
    sql += ' set ? ';
    return db.save(sql, obj, connection);
};

// 获取最新版本号信息
appDao.getTop = function(app_name) {
    return new Promise(function(fulfill, reject) {
        var sql = 'select * from ' + defaultTable;
        sql += ' where name=' + db.escape(app_name);
        sql += ' order by version desc, subversion desc limit 0,1';
        
        db.query(sql).then(function(rows) {
            if(rows && rows.length > 0) {
                fulfill(rows[0]);
            }
            fulfill({});
        }, function(err) {
            reject(err);
        });
    });
};

// 导出db
appDao.db = db;

// 导出模块
module.exports = appDao;