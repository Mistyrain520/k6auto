import { apicreateItem } from "../apiTest/item.js";


export function createItem(data){
    let item = apicreateItem({
        'params': {
            'returnBykey': ['objectId']
        },
        'name': '创建事项名字',
        'workspace': data.myworkspace.objectId,
        'itemType': data.myitemtype.objectId,
        'itemGroup': data.myitemGroup.objectId,
        'group': '事项场景.事项',
        'casename': '创建事项',
        'isNotLog': data.isNotLog
    })
    return item
}