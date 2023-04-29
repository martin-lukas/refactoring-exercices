import invoices from "../invoices.json" assert { type: "json" };
import { toUsd } from "./currency.js"
import { toStatement } from "./invoiceTransform.js"

function toPlainTextStatement(statement) {
    const heading = `Statement for ${statement.customer}`
    const orderLines = statement.performances.map(perf =>
        `  ${perf.play}: ${toUsd(perf.price)} (${perf.audience} seats)`)
    const priceSummary = `Amount owed is ${toUsd(statement.totalPrice)}`;
    const volumeCreditsSummary = `You earned ${statement.volumeCredits} credits`;

    return [heading, ...orderLines, priceSummary, volumeCreditsSummary,].join("\n");
}

const statement = toStatement(invoices[0])

console.log(toPlainTextStatement(statement))
