import { masterNumber } from "@/lib/data/masterNumber";
import { karmicDebtNumber } from "@/lib/data/karmicDebtNumber";
import { addKarmicNumber } from './karmicDebt';

export function sumDigit(number: number, checkIsMaster = false): number {
   if (karmicDebtNumber.has(number) && checkIsMaster) {
      addKarmicNumber(number);
   }
   if (masterNumber.has(number) && checkIsMaster) {
      return number;
   }
   let total = 0;

   while (number > 0) {
      total += number % 10;
      number = Math.floor(number / 10);
   }
   if (total > 9) {
      return sumDigit(total, checkIsMaster);
   }
   return total;
}
