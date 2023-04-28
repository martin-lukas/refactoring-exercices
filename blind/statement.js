import invoices from "../invoices.json" assert { type: "json" };
import { toUsd } from "./currency.js"
import { toStatementInvoice } from "./invoiceTransform.js"

function statement(invoice) {
    const statementInvoice = toStatementInvoice(invoice);

    const heading = `Statement for ${statementInvoice.customer}`
    const orderLines = statementInvoice.performances.map(perf =>
        `  ${perf.play}: ${toUsd(perf.price)} (${perf.audience} seats)`)
    const priceSummary = `Amount owed is ${toUsd(statementInvoice.totalPrice)}`;
    const volumeCreditsSummary = `You earned ${statementInvoice.volumeCredits} credits`;

    return [heading, ...orderLines, priceSummary, volumeCreditsSummary,].join("\n");
}

console.log(statement(invoices[0]))
