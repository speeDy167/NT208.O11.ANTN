import { sumDigit } from "@/lib/utils/sumDigit";
import {alphabetValues} from "@/lib/data/alphabet";
import {addKarmicNumber} from "@/lib/utils/karmicDebt";

export function expression(name: string): number {
    const total = name
        .split(/\s+/)
        .map(namePart => {
            let subTotal = 0;

            for (let i = 0, length = namePart.length; i < length; i++) {
                const char = namePart[i];
                subTotal += alphabetValues.get(char) || 0;
            }
            addKarmicNumber(subTotal);

            return subTotal;
        })
        .reduce((runningTotal, subTotal) => runningTotal + subTotal, 0);

    return sumDigit(total, true);
}
