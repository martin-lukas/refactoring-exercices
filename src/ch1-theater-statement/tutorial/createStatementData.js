const plays = require("../mocks/plays");

function createStatementData(invoice) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData.performances);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData.performances);
    return statementData;
}

function enrichPerformance(performance) {
    const result = Object.assign({}, performance);
    result.play = plays[performance.playID];
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
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
    return performances.reduce((acc, perf) => acc + perf.amount, 0);
}

function totalVolumeCredits(performances) {
    return performances.reduce((acc, perf) => acc + perf.volumeCredits, 0);
}

function volumeCreditsFor(performance) {
    let result = 0
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === performance.play.type) result += Math.floor(performance.audience / 5);
    return result;
}

module.exports = createStatementData;
