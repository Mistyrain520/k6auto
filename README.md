# k6auto-基于k6的全新自动化框架
- 接口自动化
- 接口性能自动化
- 前端性能自动化
- 中间件性能
- k8s混沌演练

目前调研不好做的
- UI自动化

# 构建方式
```
go install go.k6.io/xk6/cmd/xk6@latest
xk6 build --with github.com/Mistyrain520/xk6-zap@latest --with github.com/grafana/xk6-sql
```

## k6 api自动化
#### 编写底层api
暂未补充
#### 根据编写的的api来书写用例，组装场景
暂未补充
#### 生成allure报告
```
//执行测试，会自动生成日志文件夹，如2023-10-21
.\k6.exe run  .\main.js
//查看报告，先删除原来整个2023-10-21文件夹
allure serve .\2023-10-21\  
```

![报告示例](./report/report1.png)



## k6 api性能自动化自动化
```
//前面做api自动化已经编号用例了，直接拿来用就可以了
//只需要编写需要测试的性能场景，即可完成对应用例的性能场景测试
scenarios: {
    //这个场景是5个VU每个20迭代，也就是5并发，每个并发下执行20次function中的行为
    contacts: {
        executor: 'per-vu-iterations',
        vus: 5,
        iterations: 20,
        maxDuration: '5m',
        exec: 'scenarios_item',
        tags: { my_custom_tag: '事项相关场景' },
        env: { MYVAR: 'contacts' },
      }
  },
//重定向到influxdb，并接入grafana
 .\k6.exe run --console-output 'report.log' --out influxdb=http://localhost:8086/mydb .\performance.js
```

![报告示例](./report/report2.png)
![报告示例](./report/report3.png)


## TUDO
- [x] k6 ~~丰富实战项目的api自动化测试，api性能自动化(已经做好样例，后续等扩展完善再考虑增加)~~
- [x] k6 browser 实战(主体完成，持续优化中)
- [x] k6 ~~chaijs接入~~
- [x] k6 ~~zap-logger接入（自己开发的k6高性能日志库接入）~~
- [x] ~~go zap扩展开发~~
- [ ] k6 redis demo
- [x] ~~k6 pgql 接入~~
- [x] ~~k6 websocket demo~~
- [x] ~~k6 websocket 实战(单人协同文档自动化，压测，包括word ppt excel page)~~
- [ ] k6 kafka demo
- [ ] k6 k8s demo
- [ ] k6 grpc demo

