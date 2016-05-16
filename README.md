# eagle

检测服务器各节点的运行状态，[http://shimodev.com:3007](http://shimodev.com:3007)

## 运行

### 本地

    HOST=localhost npm start

open [http://localhost:3000](http://localhost:3000) in browser

### 服务器上

    HOST=shimo_im npm start

open [http://localhost:9901](http://localhost:9901) in browser

服务器的端口默认为 9901，因为在 dev 上为这个服务开放的是这个端口。

配置见 config/ 目录

## TODO
* 记录每次 ping 的结果，可以交给第三方服务做图表
