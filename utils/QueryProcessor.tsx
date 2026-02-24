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
    // Addition (single or chained): "What is 73 plus 29?" or "What is 59 plus 55 plus 37?"
    const addMatch = lower.match(/^what is (\d+(?:\s+plus\s+\d+)+)\?$/);
    if (addMatch) {
    const nums = addMatch[1].split(/\s+plus\s+/).map(s => parseInt(s, 10));
    const sum = nums.reduce((acc, n) => acc + n, 0);
    return String(sum);
    }
    const subMatch = lower.match(/what is (\d+) minus (\d+)/);
    if (subMatch) {
        const a = parseInt(subMatch[1], 10);
        const b = parseInt(subMatch[2], 10);
        return String(a - b);
    }
    const powerMatch = lower.match((/what is (\d+) to the power of (\d+)/));
    if(powerMatch){
        const a = parseInt(powerMatch[1], 10);
        const b = parseInt(powerMatch[2], 10);
        return String(a**b);
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

    const results: number[] = [];

    for (const num of numbers) {
        const sqrt = Math.sqrt(num);
        const cbrt = Math.cbrt(num);

        if (Number.isInteger(sqrt) && Number.isInteger(cbrt)) {
        results.push(num);
        }
    }

    return results.join(", ");
    }
    // Prime numbers
    const primeMatch = lower.match(/primes: ([\d,\s]+)/);
    if (primeMatch) {
    const numbers = primeMatch[1]
        .split(",")
        .map(n => parseInt(n.trim(), 10));

    const isPrime = (num: number): boolean => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
        }
        return true;
    };

    const primes = numbers.filter(isPrime);

    return primes.join(", ");
    }

    return "";
}