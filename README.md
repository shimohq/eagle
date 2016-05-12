# eagle

检测服务器各节点的运行状态

## 运行

### 本地

    HOST=localhost npm start

### 服务器上

    HOST=shimo_im npm start

配置见 config/ 目录

## TODO
* ping 改为在后端定时触发，而不是前端触发。前端只是取值，否则过多的前端会导致重复的ping和无谓的开销
* 记录每次 ping 的结果，可以交给第三方服务做图表
* 给每种节点提供 info 服务，显示节点的内存、cpu等情况
