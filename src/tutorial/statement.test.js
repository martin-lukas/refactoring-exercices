const statement = require('./statement');
const invoices = require('../mocks/invoices')
const plays = require('../mocks/plays')

test('Test example', () => {
    // Write your test logic here
    expect(statement(invoices[0], plays)).not.toBeNull();
});
