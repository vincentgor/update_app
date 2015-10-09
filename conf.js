/**
 * Created by vinxent on 2015/8/1.
 */
var conf = {
	
};

/*
start:   NODE_ENV=development PORT=80 forever -a -l /root/mywork/my_wechat/my_wechat.log start /root/mywork/my_wechat/bin/www
restart: NODE_ENV=development PORT=80 forever -a -l /root/mywork/my_wechat/my_wechat.log restart /root/mywork/my_wechat/bin/www
stop:    NODE_ENV=development PORT=80 forever -a -l /root/mywork/my_wechat/my_wechat.log stop /root/mywork/my_wechat/bin/www

forever -a -l /home/ubuntu/workspace/update_app.log restart  /home/ubuntu/workspace/bin/www
*/

module.exports = conf;