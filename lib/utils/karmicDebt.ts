export const karmicDebt: Set<number> = new Set();
import { karmicDebtNumber } from "@/lib/data/karmicDebtNumber";

export function addKarmicNumber(number: number) {
    if (karmicDebtNumber.has(number)) {
        karmicDebt.add(number);
    }
}

// Depends on 6 main indexes
export function getKarmicDebtNumber(): string {
    return Array.from(karmicDebt.values()).join(',');
}