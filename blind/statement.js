import invoices from '../invoices.json' assert { type: 'json' };
import plays from '../plays.json' assert { type: 'json' };

function toUsd(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format(value);
}

function calculateTragedyPrice(audience) {
    let sum = 40000;
    if (audience > 30) {
        sum += 1000 * (audience - 30);
    }
    return sum;
}

function calculateComedyPrice(audience) {
    let sum = 30000;
    if (audience > 20) {
        sum += 10000 + 500 * (audience - 20);
    }
    sum += 300 * audience;
    return sum;
}

function calculatePlayPrice(playType, audience) {
    switch (playType) {
        case "tragedy":
            return calculateTragedyPrice(audience);
        case "comedy":
            return calculateComedyPrice(audience);
        default:
            throw new Error(`unknown type: ${playType}`);
    }
}

function calculateVolumeCredits (playType, audience) {
    let sum = Math.max(audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if (playType === "comedy") {
        sum += Math.floor(audience / 5);
    }
    return sum;
}

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let playPrice = calculatePlayPrice(play.type, perf.audience);

        volumeCredits += calculateVolumeCredits(play.type, perf.audience);

        // print line for this order
        result += `  ${play.name}: ${toUsd(playPrice / 100)} (${perf.audience} seats)\n`;
        totalAmount += playPrice;
    }
    result += `Amount owed is ${toUsd(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

console.log(statement(invoices[0], plays))
