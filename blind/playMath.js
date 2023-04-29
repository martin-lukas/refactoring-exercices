export function calculatePlayPrice(playType, audience) {
    const typeConfig = getPlayTypeConfig(playType);
    let totalPriceInCents = typeConfig.price + typeConfig.personMultiplier * audience;
    if (audience > typeConfig.bonusThreshold) {
        totalPriceInCents += typeConfig.baseBonus + typeConfig.bonusPersonMultiplier * (audience - typeConfig.bonusThreshold);
    }
    return totalPriceInCents / 100;
}

export function calculateVolumeCredits(playType, audience) {
    const typeConfig = getPlayTypeConfig(playType);
    let credits = Math.max(audience - 30, 0);
    // add extra credit for every X play attendees if configured for the play type
    if (typeConfig.volumeCreditPer !== null) {
        credits += Math.floor(audience / typeConfig.volumeCreditPer);
    }
    return credits;
}

function getPlayTypeConfig(playType) {
    const typeConfig = PLAY_TYPES[playType];
    if (typeConfig === undefined) {
        throw new Error(`Unknown play type: ${playType}`);
    }
    return typeConfig;
}

const PLAY_TYPES = {
    tragedy: {
        price: 40000,
        personMultiplier: 0,
        bonusThreshold: 30,
        baseBonus: 0,
        bonusPersonMultiplier: 1000,
        volumeCreditPer: null,
    },
    comedy: {
        price: 30000,
        personMultiplier: 300,
        bonusThreshold: 20,
        baseBonus: 10000,
        bonusPersonMultiplier: 500,
        volumeCreditPer: 5,
    },
}
