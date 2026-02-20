// RevVault — AI Recommendation Engine

/**
 * Score similarity between two cars (0–100)
 */
function similarity(a, b) {
    if (a.id === b.id) return -1;
    let score = 0;

    // Same brand: big boost
    if (a.brand === b.brand) score += 35;

    // HP proximity (within 200 hp)
    const hpDiff = Math.abs(a.hp - b.hp);
    if (hpDiff < 50) score += 25;
    else if (hpDiff < 100) score += 15;
    else if (hpDiff < 200) score += 8;

    // Year proximity (within 4 years)
    const yearDiff = Math.abs(a.year - b.year);
    if (yearDiff <= 1) score += 20;
    else if (yearDiff <= 2) score += 12;
    else if (yearDiff <= 4) score += 6;

    // Shared tags
    const sharedTags = (a.tags || []).filter(t => (b.tags || []).includes(t));
    score += sharedTags.length * 8;

    return score;
}

/**
 * Get N cars most similar to the given car
 */
export function getSimilarCars(car, allCars, n = 4) {
    return allCars
        .map(c => ({ car: c, score: similarity(car, c) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, n)
        .map(x => x.car);
}

/**
 * Get N recommended cars based on a set of liked car IDs
 */
export function getRecommendedForUser(likedIds, allCars, n = 6) {
    if (likedIds.length === 0) {
        // Cold start: return top-HP cars
        return [...allCars].sort((a, b) => b.hp - a.hp).slice(0, n);
    }

    const likedCars = allCars.filter(c => likedIds.includes(c.id));
    const scores = {};

    for (const liked of likedCars) {
        for (const candidate of allCars) {
            if (likedIds.includes(candidate.id)) continue;
            scores[candidate.id] = (scores[candidate.id] || 0) + similarity(liked, candidate);
        }
    }

    return allCars
        .filter(c => !likedIds.includes(c.id))
        .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
        .slice(0, n);
}

/**
 * Generate an AI-style description for a car
 */
export function generateAIDescription(car) {
    const powerTier = car.hp >= 900 ? 'hypercar' : car.hp >= 600 ? 'supercar' : 'performance car';
    const sprintWord = car.sprint <= 2.5 ? 'blistering' : car.sprint <= 3.2 ? 'ferocious' : 'spirited';
    const topSpeedWord = car.topSpeed >= 340 ? 'stratospheric' : car.topSpeed >= 300 ? 'exhilarating' : 'impressive';

    const sentences = [
        `The ${car.brand.charAt(0).toUpperCase() + car.brand.slice(1)} ${car.model} stands as one of the most compelling ${powerTier}s of the ${Math.floor(car.year / 10) * 10}s.`,
        `Under the hood lies a ${car.engine} unit producing a ${sprintWord} ${car.hp} horsepower, capable of launching the car from 0 to 100 km/h in just ${car.sprint} seconds.`,
        `With a ${topSpeedWord} top speed of ${car.topSpeed} km/h and ${car.torque} Nm of torque, every throttle input is met with immediate, visceral response.`,
        `This machine was engineered not merely for transportation, but as an expression of what happens when performance and artistry converge at the highest level.`,
        `Whether attacking a mountain pass or commanding attention on a boulevard, the ${car.model} doesn't just meet expectations — it obliterates them.`,
    ];

    return sentences.join(' ');
}
