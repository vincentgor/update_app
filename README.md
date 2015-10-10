# update_app
升级app程序

使用帮助：
1. 下载项目： git clone https://github.com/vincentgor/update_app.git
2. 安装依赖模块： npm install
3. 全局安装forever模块： npm install -g forever
4. forever的作用在于，可以让你的程序一直运行下去。当然，你也可以用 nohub npm start&.
5. forever常用的三个命令：详情见conf.js
6. 首次运行项目： forever -a -l /home/ubuntu/workspace/update_app.log start  /home/ubuntu/workspace/bin/www
7. 日志放在 update_app.log。也有可能在forever模块下的 update_app.log。例如我这里一开始就是在 /home/ubuntu/.forever/update_app.log 
8. 想要实时查看日志： tail -f update_app.log
