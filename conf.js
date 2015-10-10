/**
 * Created by vinxent on 2015/8/1.
 */
var conf = { };

// 数据库配置
conf.db = {
    host      : '127.0.0.1',
    port      : '3306',
    database  : 'c9',
    user      : 'vincent_gor',
    password  : '',
    charset   : 'UTF8'
};

/*
forever -a -l /home/ubuntu/workspace/update_app.log start  /home/ubuntu/workspace/bin/www
forever -a -l /home/ubuntu/workspace/update_app.log stop  /home/ubuntu/workspace/bin/www
forever -a -l /home/ubuntu/workspace/update_app.log restart  /home/ubuntu/workspace/bin/www
*/

module.exports = conf;