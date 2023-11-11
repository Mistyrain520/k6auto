const chai = require('chai');
const expect = chai.expect;

function checkExpectation(expectationFunc) {
    try {
        expectationFunc();
        return 'Expectation passed';
    } catch (error) {
        return `Expectation failed: ${error.message}`;
    }
}

// 使用示例
const responseBody = { a: 1, b: 2 };
console.log(checkExpectation(() => expect(responseBody).to.have.all.keys('a', 'b')));
