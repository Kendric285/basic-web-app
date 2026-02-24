export default function QueryProcessor(query: string): string {
    const lower = query.toLowerCase().trim();

    // Shakespeare
    if (lower.includes("shakespeare")) {
        return (
        "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
        "English poet, playwright, and actor, widely regarded as the greatest " +
        "writer in the English language and the world's pre-eminent dramatist."
        );
    }

    // Andrew ID
    if (lower.includes("andrew id")) {
        return "kzt";
    }

    // addiotion case
    const plusMatch = lower.match(/what is (\d+) plus (\d+)/);
    if (plusMatch) {
        const a = parseInt(plusMatch[1], 10);
        const b = parseInt(plusMatch[2], 10);
        return String(a + b);
    }

    //largest number
    const largestMatch = lower.match(/largest: ([\d,\s]+)/);
    if (largestMatch) {
        const numbers = largestMatch[1].split(",").map(n => parseInt(n.trim(), 10));

        return String(Math.max(...numbers));
    }
    const multiplyMatch = lower.match(/what is (\d+) multiplied by (\d+)/);
    if (multiplyMatch) {
        const a = parseInt(multiplyMatch[1], 10);
        const b = parseInt(multiplyMatch[2], 10);
        return String(a * b);
    }

    // name
    if (lower.includes("name")) {
        return "kzt";
    }
    // Both square and cube
    const squareCubeMatch = lower.match(/both a square and a cube: ([\d,\s]+)/);
    if (squareCubeMatch) {
    const numbers = squareCubeMatch[1]
        .split(",")
        .map(n => parseInt(n.trim(), 10));

    for (const num of numbers) {
        const sqrt = Math.sqrt(num);
        const cbrt = Math.cbrt(num);

        if (Number.isInteger(sqrt) && Number.isInteger(cbrt)) {
        return String(num);
        }
    }
    }

    return "";
}