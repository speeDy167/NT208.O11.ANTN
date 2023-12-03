import { alphabetValues } from "@/lib/data/alphabet";

const allNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

export function missingNumber(name: string): string {
    const numberInName = new Set<number>();

    for (const char of name.replace(/\s/g, '')) {
        const value = alphabetValues.get(char);
        if (value !== undefined) {
            numberInName.add(value);
        }
    }

    const diff = difference(allNumbers, numberInName);
    return Array.from(diff).join(',');
}

function difference<T>(setA: Set<T>, setB: Set<T>): Set<T> {
    return new Set(Array.from(setA).filter(item => !setB.has(item)));
}