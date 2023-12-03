import {sumDigit} from "@/lib/utils/sumDigit";
import {DateOfBirth} from "@/lib/dob";

export function attitude(dobObject: DateOfBirth): number {
   const daySum = sumDigit(dobObject.day, true);
   const monthSum = sumDigit(dobObject.month, true);

   return sumDigit(daySum + monthSum, true);
}
