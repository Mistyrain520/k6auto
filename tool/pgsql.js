import sql from 'k6/x/sql';

// The second argument is a PostgreSQL connection string, e.g.
// postgres://myuser:mypass@127.0.0.1:5432/postgres?sslmode=disable
const db = sql.open('postgres', 'postgres://gitee_team:fa29136a28579f30efe21829aef27bf89730070dbeb331729354d7995ac84a7b@127.0.0.1:5432/osc?sslmode=disable');

// export function setup() {
//   db.exec(`CREATE TABLE IF NOT EXISTS keyvalues (
//     id SERIAL PRIMARY KEY,
//     key varchar(50) NOT NULL,
//     value varchar(50)
//   )`);
// }

// export function teardown() {
//   db.close();
// }

export function pgQuerytest() {
  let results = sql.query(db, `select name from "Item" limit 1;`);
  //[{"name":"1111"}]
  console.log(results)
  for (const row of results) {
    //key: 1111 
    console.log(`key: ${row.name}`);
  }
}

export function getFieldtype_Date(){
    let results = sql.query(db, `select "objectId" from "FieldType" where name = '日期';`);
    return results[0]['objectId']
}
