/*
* 路由器类
*/

module.exports = function (app) {
	
    //首页接口
    app.use('/', require('./web/router/index'));

    //用户接口
    app.use('/user', require('./web/router/users'));

};
