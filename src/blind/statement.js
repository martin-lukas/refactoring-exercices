import invoices from "../mocks/invoices.js" assert { type: "json" };
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

function toHtmlStatement(statement) {
    const heading = `Statement for ${statement.customer}`
    return `<html><head><title>${heading}</title></head><body><h1>${heading}</h1><ul>${statement.performances.map(perf => `<li>${perf.play}: ${toUsd(perf.price)} (${perf.audience} seats)</li>`).join("")}</ul><p>Amount owed is ${toUsd(statement.totalPrice)}</p><p>You earned ${statement.volumeCredits} credits</p></body></html>`;
}

const statement = toStatement(invoices[0])

console.log(toPlainTextStatement(statement))
console.log()
console.log(toHtmlStatement(statement))
