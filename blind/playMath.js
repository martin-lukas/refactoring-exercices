function calculateTragedyPrice(audience) {
  let sum = 40000;
  if (audience > 30) {
    sum += 1000 * (audience - 30);
  }
  return sum / 100;
}

function calculateComedyPrice(audience) {
  let sum = 30000;
  if (audience > 20) {
    sum += 10000 + 500 * (audience - 20);
  }
  sum += 300 * audience;
  return sum / 100;
}

export function calculatePlayPrice(playType, audience) {
  switch (playType) {
    case "tragedy":
      return calculateTragedyPrice(audience);
    case "comedy":
      return calculateComedyPrice(audience);
    default:
      throw new Error(`unknown type: ${playType}`);
  }
}

export function calculateVolumeCredits(playType, audience) {
  let sum = Math.max(audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if (playType === "comedy") {
    sum += Math.floor(audience / 5);
  }
  return sum;
}
