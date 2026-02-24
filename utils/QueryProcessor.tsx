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

    // Generic arithmetic handler
const arithmeticMatch = lower.match(/^what is (.+)\?$/);
if (arithmeticMatch) {
  let expr = arithmeticMatch[1];

  // Replace words with operators
  expr = expr
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .replace(/multiplied by/g, "*")
    .replace(/times/g, "*")
    .replace(/divided by/g, "/");

  // Remove anything unsafe (only allow digits and operators)
  if (!/^[\d+\-*/\s.]+$/.test(expr)) {
    return "";
  }

  try {
    // Evaluate safely
    const result = Function(`"use strict"; return (${expr})`)();
    return String(result);
  } catch {
    return "";
  }
}

    //largest number
    const largestMatch = lower.match(/largest: ([\d,\s]+)/);
    if (largestMatch) {
        const numbers = largestMatch[1].split(",").map(n => parseInt(n.trim(), 10));

        return String(Math.max(...numbers));
    }
    // Scrabble score
const scrabbleMatch = lower.match(/scrabble score of ([a-z]+)/);
if (scrabbleMatch) {
  const word = scrabbleMatch[1];

  const scores: Record<string, number> = {
    a:1,e:1,i:1,o:1,u:1,l:1,n:1,s:1,t:1,r:1,
    d:2,g:2,
    b:3,c:3,m:3,p:3,
    f:4,h:4,v:4,w:4,y:4,
    k:5,
    j:8,x:8,
    q:10,z:10
  };

  const total = word
    .split("")
    .reduce((sum, letter) => sum + (scores[letter] || 0), 0);

  return String(total);
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