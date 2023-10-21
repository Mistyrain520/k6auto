import http from 'k6/http';
import { fail } from 'k6';
import createItem from '../apiTest/item.js';
import {ApiOptions} from '../config/apiOptions.js'
import {apidelByParse} from '../apiTest/itemType.js'
import {apicreateField, apicreateScreen} from '../apiTest/screen.js'
import { getFieldtype_Date } from '../tool/pgsql.js';
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
}