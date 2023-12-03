import {sumDigit} from "@/lib/utils/sumDigit";
import {alphabetValues, DataVowels} from "@/lib/data/alphabet";
import {getYValue} from "@/lib/utils/getYValue";
import {addKarmicNumber} from "@/lib/utils/karmicDebt";

export function soulUrge(name: string): number {
    const total = name
        .split(/\s+/)
        .map(namePart => {
            let subTotal = 0;

            for (let i = 0, length = namePart.length; i < length; i++) {
                const char = namePart[i];

                if (char === 'Y') {
                    subTotal += getYValue(namePart, i);
                } else if (DataVowels.has(char)) {
                    subTotal += alphabetValues.get(char) || 0;
                }
            }
            addKarmicNumber(subTotal);

            return subTotal;
        }).reduce((runningTotal, subTotal) => runningTotal + subTotal, 0);

    return sumDigit(total, true);
}