const createStatementData = require('./createStatementData');

function statement(invoice) {
    return renderPlainText(createStatementData(invoice));
}

function renderHtml(statement) {
    let result = `<h1>Statement for ${statement.customer}</h1>\n`;
    result += `<table>\n`;
    result += `<tr><th>play</th><th>seats</th><th>costs</th></tr>\n`;
    for (let perf of statement.performances) {
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td><td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += `</table>\n`;
    result += `<p>Amount owed is <em>${usd(statement.totalAmount)}</em></p>\n`;
    result += `<p>You earned <em>${usd(statement.totalVolumeCredits)}</em> credits</p>\n`;
    return result;
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

function usd(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format(amount);
}

module.exports = statement;
