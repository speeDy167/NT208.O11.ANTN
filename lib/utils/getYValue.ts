import {alphabetValues, DataVowels} from "@/lib/data/alphabet";

export function getYValue(name: string, index: number , isVowel = true): number {
    const isVowelBefore = index > 0 && DataVowels.has(name[index - 1]);
    const isVowelAfter = index < name.length - 1 && DataVowels.has(name[index + 1]);
    const isYConsonant = isVowelBefore || isVowelAfter;
    if ((isYConsonant && !isVowel) || (!isYConsonant && isVowel)) {
        return alphabetValues.get('Y') || 0;
    }

    return 0;
}
