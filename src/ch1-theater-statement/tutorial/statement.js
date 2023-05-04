const plays = require('../mocks/plays');

function statement(invoice) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData.performances);
    return renderPlainText(statementData);
}

function enrichPerformance(performance) {
    const result = Object.assign({}, performance);
    result.play = plays[performance.playID];
    result.amount = amountFor(result);
    return result;
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${volumeCredits(data.performances)} credits\n`;
    return result;
}

function amountFor(performance) {
    let result = 0;

    switch (performance.play.type) {
        case "tragedy":
            result = 40000;
            if (performance.audience > 30) {
                result += 1000 * (performance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (performance.audience > 20) {
                result += 10000 + 500 * (performance.audience - 20);
            }
            result += 300 * performance.audience;
            break;
        default:
            throw new Error(`unknown type: ${performance.play.type}`);
    }
    return result / 100;
}

function totalAmount(performances) {
    let totalAmount = 0;
    for (let perf of performances) {
        totalAmount += perf.amount;
    }
    return totalAmount;
}

function volumeCredits(performances) {
    let result = 0;
    for (let perf of performances) {
        result += volumeCreditsFor(perf);
    }
    return result;
}

function volumeCreditsFor(performance) {
    let result = 0
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === performance.play.type) result += Math.floor(performance.audience / 5);
    return result;
}

function usd(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format(amount);
}

module.exports = statement;
