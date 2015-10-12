var db = require('mysql');
var conf = require('../../conf');
var Promise = require('promise');

// mysql客户端
var client = function() {
    
};

// 线程池
var pool = db.createPool({
    host: conf.db.host,
    port: conf.db.port,
    user: conf.db.user,
    database: conf.db.database,
    charset: conf.db.charset
});

// 查询
client.query = function(sql) {
    console.log('sql: ' + sql);
    return new Promise(function(fulfill, reject) {
        pool.getConnection(function(err, connection) {
            if(err) {
                console.error(err);
                reject(err);
            }
            // 无需自定义格式
            connection.config.queryFormat = null;
            _common(connection, sql, null, fulfill, reject);
        });
    });
};

// 保存
client.save = function(sql, obj, connection) {
    console.log('sql: ' + sql);
    return new Promise(function(fulfill, reject) {
        if (!connection) {
            client.getConnection().then(function(connection) {
                connection.config.queryFormat = null;
                _common(connection, sql, obj, fulfill, reject);
            }, function(err) {
                console.error(err);
                reject(err);
            });
        } else {
            // 无需自定义格式
            connection.config.queryFormat = null;
            _common(connection, sql, obj, fulfill, reject);
        }
    });
};

// 更新
client.update = function(sql, obj, connection) {
    console.log('sql: ' + sql);
    return new Promise(function(fulfill, reject) {
        if (!connection) {
            // 自定义格式
            client.getConnection().then(function(connection) {
                connection.config.queryFormat = function (query, values) {
                    if (!values) return query;
                    return query.replace(/\:(\w+)/g, function (txt, key) {
                        if (values.hasOwnProperty(key)) {
                            return this.escape(values[key]);
                        }
                        return txt;
                    }.bind(this));
                };
                _common(connection, sql, obj, fulfill, reject);
            }, function(err) {
                console.error(err);
                reject(err);
            });
        } else {
            connection.config.queryFormat = function (query, values) {
                if (!values) return query;
                return query.replace(/\:(\w+)/g, function (txt, key) {
                    if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                    }
                    return txt;
                }.bind(this));
            };
            _common(connection, sql, obj, fulfill, reject);
        }
    });
};

// 进行 query 操作，公用方法
var _common = function (connection, sql, obj, fulfill, reject) {
    connection.query(sql, obj, function (err, rows) {
        try {
            if(err) {
                console.error('db operator error : ');
                console.error(err);
                reject(err);
            }
            console.log('operator back rows : ');
            console.log(rows);
            fulfill(rows);
        } catch (e) {
            console.error('db operator error : ');
            console.error(e);
            reject(e);
        } finally {
            // 释放连接
            connection.release();
        }
    });
}

// 对字符串进行编码,这样就可以在所有的计算机上读取该字符
client.escape = function (obj) {
    return pool.escape(obj);
};

// 获得connection
client.getConnection = function() {
    return new Promise(function(fulfill, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                fulfill(connection);
            }
        });
    });
};

// 释放 connection
client.release = function(connection) {
    try {
        if (connection) 
            connection.release();
    } catch (e) {
        console.error(e)
    }
}

// 导出线程池
client.pool = pool;

// 导出模块
module.exports = client;