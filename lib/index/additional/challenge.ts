import {alphabetValues, DataVowels} from "@/lib/data/alphabet";
import {getYValue} from "@/lib/utils/getYValue";

export function expressionChallenge(name: string): number {
    return Math.abs(personalityChallenge(name) - soulChallenge(name));
}

export function soulChallenge(name: string): number {
    return challengeNumber(name);
}

export function personalityChallenge(name: string): number {
    return challengeNumber(name, false);
}

function challengeNumber(name: string, isSoulChallenge = true): number {
    const length = name.length;
    let first = 0;
    let last = 0;

    for (let i = 0; i < length; i++) {
        const char = name[i];
        if (!alphabetValues.has(char)) {
            continue;
        }

        if (char === 'Y') {
            const yValue = getYValue(name, i, isSoulChallenge);
            if (yValue === 0) {
                continue;
            }
            last = yValue;

            if (first === 0) {
                first = yValue;
            }
            continue;
        }

        const charValue = alphabetValues.get(char) || 0;
        const isVowel = DataVowels.has(char);

        if ((isSoulChallenge && isVowel) || (!isSoulChallenge && !isVowel)) {
            last = charValue;

            if (first === 0) {
                first = charValue;
            }
        }
    }
    return Math.abs(first - last);
}