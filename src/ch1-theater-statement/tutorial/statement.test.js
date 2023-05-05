require('../mocks/plays');
const { statement, htmlStatement } = require('./statement');

const defaultInvoice = {
    customer: "Customer A",
    performances: [
        { playID: "someComedy", audience: 55 },
        { playID: "someTragedy", audience: 35 },
        { playID: "anotherComedy", audience: 40 },
    ]
};

const defaultPlays = {
    someComedy: { name: "Some Comedy", type: "comedy" },
    someTragedy: { name: "Some Tragedy", type: "tragedy" },
    anotherComedy: { name: "Another Comedy", type: "comedy" }
};

jest.mock('../mocks/plays', () => defaultPlays);

test('Statement should output the correct text on default inputs', () => {
    const outputStatement = statement(defaultInvoice);
    expect(outputStatement).not.toBeNull();
    const outputLines = outputStatement.split('\n');
    expect(outputLines[0]).toBe('Statement for Customer A');
    expect(outputLines[1]).toBe('  Some Comedy: $740.00 (55 seats)');
    expect(outputLines[2]).toBe('  Some Tragedy: $450.00 (35 seats)');
    expect(outputLines[3]).toBe('  Another Comedy: $620.00 (40 seats)');
    expect(outputLines[4]).toBe('Amount owed is $1,810.00');
    expect(outputLines[5]).toBe('You earned 59 credits');
    expect(outputLines[6]).toBe('');
});

test('HTML Statement should output the correct HTML code on default inputs', () => {
    const outputStatement = htmlStatement(defaultInvoice);
    expect(outputStatement).not.toBeNull();
    const outputLines = outputStatement.split('\n');
    expect(outputLines[0]).toBe('<h1>Statement for Customer A</h1>');
    expect(outputLines[1]).toBe('<table>');
});
