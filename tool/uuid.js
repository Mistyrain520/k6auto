const { v4: uuidv4 } = require('uuid');
console.log(uuid)
export function generateUUID(){
    let uuid = uuidv4();
    return uuid
}