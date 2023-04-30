const statement = require('./statement');
const plays = require('../mocks/plays')

const defaultInvoice = {
    "customer": "BigCo",
    "performances": [
        {
            "playID": "hamlet",
            "audience": 55
        },
        {
            "playID": "as-like",
            "audience": 35
        },
        {
            "playID": "othello",
            "audience": 40
        }
    ]
};

test('Test example', () => {
    // Write your test logic here
    expect(statement(defaultInvoice, plays)).not.toBeNull();
});
