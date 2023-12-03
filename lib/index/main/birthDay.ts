import {sumDigit} from "@/lib/utils/sumDigit";
import {DateOfBirth} from "@/lib/dob";
export function birthDay(dobObject: DateOfBirth): number {
   return sumDigit(dobObject.day, true);
}
