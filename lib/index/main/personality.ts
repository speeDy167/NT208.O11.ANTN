import { sumDigit } from "@/lib/utils/sumDigit";
import {alphabetValues, DataConsonants} from "@/lib/data/alphabet";
import { getYValue } from "@/lib/utils/getYValue";
import {addKarmicNumber} from "@/lib/utils/karmicDebt";

export function personality(name: string): number {
    const total = name
        .split(/\s+/)
        .map(namePart => {
            let subTotal = 0;

            for (let i = 0, length = namePart.length; i < length; i++) {
                const char = namePart[i];

                if (DataConsonants.has(char)) {
                    if (char === 'Y') {
                        subTotal += getYValue(namePart, i, false);
                    } else {
                        subTotal += alphabetValues.get(char) || 0;
                    }
                }
            }
            addKarmicNumber(subTotal);

            return subTotal;
        }).reduce((runningTotal, subTotal) => runningTotal + subTotal, 0);

    return sumDigit(total, true);
}
