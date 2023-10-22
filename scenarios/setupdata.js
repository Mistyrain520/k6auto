import {ApiOptions} from '../config/apiOptions.js'
import {apicreateItemType, apicreateItemTypeScheme} from '../apiTest/itemType.js'
import {apicreateField, apicreateItemTypeScreenScheme, apicreateScreen, apicreateScreenScheme} from '../apiTest/screen.js'
import { getFieldtype_Date } from '../tool/pgsql.js';
import { apiWorkflowScheme, apicreatFlow, apicreateStatus } from '../apiTest/workflow.js';
import sql from 'k6/x/sql';
import { apiWorkspace } from '../apiTest/workspace.js';
//初始化数据场景

/*
如何编写用例？
直接传参去调用用例接口即可，比如：
let myitemtype = apicreateItemType({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化类型',
        'key': 'k6itemtype',
        'group': '初始化数据.事项类型',
        'casename': '创建事项类型'
    })
其中必要参数：
    'group': '初始化数据.事项类型', //这个是用例报告分组，代表这个用例会放在  初始化/事项类型 这个分组下
    'casename': '创建事项类型', //这个是用例名称，
非必须参数：
    'params': {
            'returnBykey': ['objectId'], //通过key来获取请求返回值，返回 {'key': value}
            'jsonpath': '',   //jsonpath方式获取请求的返回值， 返回 []
        }, //如果不填写这个，那么返回整个请求body
    
其他参数：
    apicreateItemType是创建类型的接口，创建类型需要填写名字和表示，因此该接口需要这两个参数
    'key'  //这个是根据apicreateItemType接口自己定义的
    'name' //这个也是

*/
export function setupdata(){
    const db = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');
    try {
        // 尝试执行一个简单的查询
        let results = db.query('SELECT 1');
        console.log('数据库连接成功');
    } catch (error) {
        console.log('数据库连接失败：', error);
        return
    }
    const data = {}
    //新建类型，新建类型方案
    let myitemtype = apicreateItemType({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化类型',
        'key': 'k6itemtype',
        'group': '初始化数据.事项类型',
        'casename': '创建事项类型'
    })
    //用新建类型的obid和类型的key，来新建类型方案，返回方案的obid
    let myitemtypescheme = apicreateItemTypeScheme({
        'objectId': myitemtype && myitemtype.objectId,
        'key': 'k6itemtype',
        'name': 'k6事项类型方案',
        'params': {'returnBykey': ['objectId']},
        'group': '初始化数据.事项类型',
        'casename': '创建事项类型方案',
        
    })
    //将返回的objectId存下来，后面再操作删除掉创建的这个数据
    data.myitemtype = {'objectId': myitemtype && myitemtype.objectId}
    data.myitemtypescheme = {'objectId': myitemtypescheme && myitemtypescheme.objectId}
    //新建字段，并且新建界面
    let myField = apicreateField({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化日期字段',
        'key': 'k6date',
        'objectId': getFieldtype_Date(db),
        'group': '初始化数据.字段和界面',
        'casename': '创建自定义字段',
    })
    let myscreen = apicreateScreen({
            'params': {
                'returnBykey': ['objectId']
            },
            'name': 'k6自动化界面',
            'children': [{
                "_id": 'k6date' + ApiOptions.projectuuid,
                "component": "Date",
                "config": {
                    "layoutConfig": {
                        "componentCols": 12
                    }
                }
            }],
            'group': '初始化数据.字段和界面',
            'casename': '创建界面',
        })
    let myscreenScheme = apicreateScreenScheme(
        {
            'params': {
                'returnBykey': ['objectId']
            },
            'name': 'k6自动化界面方案',
            'objectId': myscreen && myscreen.objectId,
            'group': '初始化数据.字段和界面',
            'casename': '创建界面方案',
        }
     )
    let myItemTypeScreenScheme = apicreateItemTypeScreenScheme(
        {
            'params': {
                'returnBykey': ['objectId']
            },
            'name': 'k6自动化类型界面方案',
            'objectId': myscreenScheme && myscreenScheme.objectId,
            'group': '初始化数据.字段和界面',
            'casename': '创建类型界面方案',
        }
     )
     data.myField = {'objectId': myField && myField.objectId}
     data.myscreen = {'objectId': myscreen && myscreen.objectId}
     data.myscreenScheme = {'objectId': myscreenScheme && myscreenScheme.objectId}
     data.myItemTypeScreenScheme = {'objectId': myItemTypeScreenScheme && myItemTypeScreenScheme.objectId}


    let myStatus1 = apicreateStatus({
            'params': {
                'returnBykey': ['objectId']
            },
            'name': 'k6自动化状态A',
            'type': 'InProgress',
            'group': '初始化数据.工作流',
            'casename': '创建状态',
        })
    let myStatus2 = apicreateStatus({
            'params': {
                'returnBykey': ['objectId']
            },
            'name': 'k6自动化状态B',
            'type': 'InProgress',
            'group': '初始化数据.工作流',
            'casename': '创建状态',
        })
    data.myStatus1 = {'objectId': myStatus1 && myStatus1.objectId}
    data.myStatus2 = {'objectId': myStatus2 && myStatus2.objectId}

    let myFlow = apicreatFlow({
            'params': {
                'returnBykey': ['id']
            },
            'name': 'k6自动化工作流',
            'statusKey1': myStatus1 && myStatus1.objectId,
            'statusName1': 'k6自动化状态A',
            'statusKey2': myStatus2 && myStatus2.objectId,
            'statusName2': 'k6自动化状态B',
            'group': '初始化数据.工作流',
            'casename': '创建工作流',
        })
    data.myFlow = {'objectId': myFlow && myFlow.objectId}
    let myFlowScheme = apiWorkflowScheme({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化工作流方案',
        'group': '初始化数据.工作流',
        'casename': '创建工作流方案',
    })
    data.myFlowScheme = {'objectId': myFlowScheme && myFlowScheme.objectId}

    let myworkspace = apiWorkspace({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化空间',
        'key': 'k6auto',
        'itemTypeScheme': myitemtypescheme && myitemtypescheme.objectId,
        'itemTypeScreenScheme': myItemTypeScreenScheme && myItemTypeScreenScheme.objectId,
        'workflowScheme': myFlowScheme && myFlowScheme.objectId,
        'group': '初始化数据.空间',
        'casename': '创建空间',
    })
    data.myworkspace = {'objectId': myworkspace && myworkspace.objectId} 
    return data
}
  