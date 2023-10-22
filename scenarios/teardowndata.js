import {ApiOptions} from '../config/apiOptions.js'
import {apidelByParse} from '../apiTest/itemType.js'
export function teardowndata(data){
    apidelByParse({
        'tablename': 'ItemTypeScheme',
        'objectId': data.myitemtypescheme.objectId,
        'group': '后置处理.事项类型',
        'casename': '删除事项类型方案'
    })
    apidelByParse({
        'tablename': 'ItemType',
        'objectId': data.myitemtype.objectId,
        'group': '后置处理.事项类型',
        'casename': '删除事项类型'
    })
    apidelByParse({
        'tablename': 'ItemTypeScreenScheme',
        'objectId': data.myItemTypeScreenScheme.objectId,
        'group': '后置处理.字段和界面',
        'casename': '删除类型界面方案'
    })
    apidelByParse({
        'tablename': 'ScreenScheme',
        'objectId': data.myscreenScheme.objectId,
        'group': '后置处理.字段和界面',
        'casename': '删除界面方案'
    })
    apidelByParse({
        'tablename': 'Screen',
        'objectId': data.myscreen.objectId,
        'group': '后置处理.字段和界面',
        'casename': '删除界面'
    })
    apidelByParse({
        'tablename': 'CustomField',
        'objectId': data.myField.objectId,
        'group': '后置处理.字段和界面',
        'casename': '删除字段'
    })
    apidelByParse({
        'tablename': 'Workflow',
        'objectId': data.myFlow.objectId,
        'group': '后置处理.工作流',
        'casename': '删除工作流'
    })
    apidelByParse({
        'tablename': 'Status',
        'objectId': data.myStatus1.objectId,
        'group': '后置处理.工作流',
        'casename': '删除状态'
    })
    apidelByParse({
        'tablename': 'Status',
        'objectId': data.myStatus2.objectId,
        'group': '后置处理.工作流',
        'casename': '删除状态'
    })
}