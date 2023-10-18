import http from 'k6/http';
import { fail } from 'k6';
import createItem from '../apiTest/item.js';
import {ApiOptions} from '../config/apiOptions.js'
import {apicreateItemType, apicreateItemTypeScheme} from '../apiTest/itemType.js'
import {apicreateField, apicreateScreen} from '../apiTest/screen.js'
import { getFieldtype_Date } from '../tool/pgsql.js';
//初始化数据场景
export function setupdata(){
    const data = {}

    //新建类型，新建类型方案
    let myitemtype = apicreateItemType({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化类型',
        'key': 'k6itemtype',
    })
    //用新建类型的obid和类型的key，来新建类型方案，返回方案的obid
    let myitemtypescheme = apicreateItemTypeScheme({
        'objectId': myitemtype.objectId,
        'key': 'k6itemtype',
        'name': 'k6事项类型方案',
        'params': {'returnBykey': ['objectId']},
        
    })
    data.myitemtype = {'objectId': myitemtype.objectId}
    data.myitemtypescheme = {'objectId': myitemtypescheme.objectId}


    //新建字段，并且新建界面
    let myField = apicreateField({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': 'k6自动化日期字段',
        'key': 'k6date',
        'objectId': getFieldtype_Date()
    })
     let myscreen = apicreateScreen(
        {
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
            }]
        }
     )
     data.myField = {'objectId': myField.objectId}
     data.myscreen = {'objectId': myscreen.objectId}

    return data
}
  