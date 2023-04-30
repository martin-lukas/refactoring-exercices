import plays from "../mocks/plays.js" assert { type: "json" };
import { calculatePlayPrice, calculateVolumeCredits } from "./playMath.js"

function enrichPerformance(performance) {
    const play = plays[performance.playID];
    return {
        play: play.name,
        price: calculatePlayPrice(play.type, performance.audience),
        audience: performance.audience,
        volumeCredits: calculateVolumeCredits(play.type, performance.audience),
    };
}

export function toStatement(invoice) {
    const enrichedPerformances = invoice.performances.map(enrichPerformance);
    return {
        customer: invoice.customer,
        performances: enrichedPerformances,
        totalPrice: enrichedPerformances.reduce((prev, curr) => prev + curr.price, 0),
        volumeCredits: enrichedPerformances.reduce((prev, curr) => prev + curr.volumeCredits, 0),
    };
}
