const statement = require('./statement');

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

test('Test example', () => {
    // Write your test logic here
    expect(statement(defaultInvoice, defaultPlays)).not.toBeNull();
});
