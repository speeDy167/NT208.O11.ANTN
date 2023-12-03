import {sumDigit} from "@/lib/utils/sumDigit";
import {DateOfBirth} from "@/lib/dob";

export function lifePath(dobObject: DateOfBirth): number {
   const daySum = sumDigit(dobObject.day, true);
   const monthSum = sumDigit(dobObject.month, true);
   const yearSum = sumDigit(dobObject.year, true)

   return sumDigit(daySum + monthSum + yearSum, true);
}
