import invoices from "../invoices.json" assert { type: "json" };
import plays from "../plays.json" assert { type: "json" };
import { calculatePlayPrice, calculateVolumeCredits } from "./playMath.js"
import { toUsd } from "./currency.js"
import { toStatementInvoice } from "./invoiceTransform.js"

function statement(invoice, plays) {
    const heading = `Statement for ${invoice.customer}`;

    let orderLines = [];

    let totalPrice = 0;
    let volumeCredits = 0;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let playPrice = calculatePlayPrice(play.type, perf.audience);

        volumeCredits += calculateVolumeCredits(play.type, perf.audience);

        totalPrice += playPrice;

        orderLines.push(`  ${play.name}: ${toUsd(playPrice)} (${perf.audience} seats)`);
    }

    const priceSummary = `Amount owed is ${toUsd(totalPrice)}`;
    const volumeCreditsSummary = `You earned ${volumeCredits} credits`;

    return [
        heading,
        orderLines.join("\n"),
        priceSummary,
        volumeCreditsSummary
    ].join("\n");
}

function statement2(invoice) {
    const statementInvoice = toStatementInvoice(invoice);

    const heading = `Statement for ${statementInvoice.customer}`
    const orderLines = statementInvoice.performances.map(perf =>
        `  ${perf.play}: ${toUsd(perf.price)} (${perf.audience} seats)`)
    const priceSummary = `Amount owed is ${toUsd(statementInvoice.totalPrice)}`;
    const volumeCreditsSummary = `You earned ${statementInvoice.volumeCredits} credits`;

    return [heading, orderLines.join("\n"), priceSummary, volumeCreditsSummary,].join("\n");
}

console.log("Old")
console.log(statement(invoices[0], plays))

console.log("New")
console.log(statement2(invoices[0]))
