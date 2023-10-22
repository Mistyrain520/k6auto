# k6auto-基于k6的全新自动化框架
- 接口自动化
- 接口性能自动化
- 前端性能自动化


## k6 api自动化
#### 编写底层api
暂未补充
#### 根据编写的的api来书写用例，组装场景
暂未补充
#### 生成allure报告
```
//执行测试，先删除旧的report.log
.\k6.exe run --console-output 'report.log' .\main.js
//生成日志，这一步未来会替换为扩展就可以不需要执行了
node ./logger/logger.js
//查看报告，先删除原来整个2023-10-21文件夹
allure serve .\2023-10-21\  
```

![报告示例](./report/report1.png)



## k6 api性能自动化自动化
```
//重定向到influxdb，并接入grafana
 .\k6.exe run --console-output 'report.log' --out influxdb=http://localhost:8086/mydb .\performance.js
```

![报告示例](./report/report2.png)
![报告示例](./report/report3.png)