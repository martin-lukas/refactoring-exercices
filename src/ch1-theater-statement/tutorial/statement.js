const plays = require('../mocks/plays');

function statement(invoice) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance)
    return renderPlainText(statementData);
}

function enrichPerformance(performance) {
    const result = Object.assign({}, performance);
    result.play = playFor(performance);
    return result;
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount(data.performances))}\n`;
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
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}

function totalAmount(performances) {
    let totalAmount = 0;
    for (let perf of performances) {
        totalAmount += amountFor(perf);
    }
    return totalAmount / 100;
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

function playFor(performance) {
    return plays[performance.playID];
}

function usd(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format(amount);
}

module.exports = statement;
