import {sumDigit} from "@/lib/utils/sumDigit";
import {alphabetValues} from "@/lib/data/alphabet";
import {DateOfBirth} from "@/lib/dob";

export function adversityResilience(name: string): number {
   const nameParts = name.split(/\s+/);

   const total = nameParts.reduce((acc, part) => {
      const firstChar = part[0];
      return acc + (alphabetValues.get(firstChar) || 0);
   }, 0);

   return sumDigit(total);
}

export function thinkingCapacity(dobObject: DateOfBirth, name: string): number {
   const daySum = sumDigit(dobObject.day, true);
   const lastName = name.split(/\s+/)[0];
   // @ts-ignore
   let lastNameNumber = [...lastName].reduce((total, char) => total + (alphabetValues.get(char) || 0), 0);

   return sumDigit(daySum + sumDigit(lastNameNumber));
}

