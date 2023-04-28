import plays from "../plays.json" assert { type: "json" };
import { calculatePlayPrice, calculateVolumeCredits } from "./statement.js"

function enrichPerformance(performance) {
    const play = plays[performance.playID];
    return {
        play: play.name,
        price: calculatePlayPrice(play.type, performance.audience),
        audience: performance.audience,
        volumeCredits: calculateVolumeCredits(play.type, performance.audience),
    };
}

export function toStatementInvoice(invoice) {
    const enrichedPerformances = invoice.performances.map(enrichPerformance);
    return {
        customer: invoice.customer,
        performances: enrichedPerformances,
        totalPrice: enrichedPerformances.reduce((prev, curr) => prev + curr.price, 0),
        volumeCredits: enrichedPerformances.reduce((prev, curr) => prev + curr.volumeCredits, 0),
    };
}
