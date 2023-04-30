const plays = require('../mocks/plays');

function statement(invoice) {
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        result += `  ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(totalAmount(invoice))}\n`;
    result += `You earned ${volumeCredits(invoice)} credits\n`;
    return result;
}

function amountFor(performance) {
    let result = 0;

    switch (playFor(performance).type) {
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

function totalAmount(invoice) {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
        totalAmount += amountFor(perf);
    }
    return totalAmount / 100;
}

function volumeCredits(invoice) {
    let result = 0;
    for (let perf of invoice.performances) {
        result += volumeCreditsFor(perf);
    }
    return result;
}

function volumeCreditsFor(performance) {
    let result = 0
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === playFor(performance).type) result += Math.floor(performance.audience / 5);
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
