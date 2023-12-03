import moment from 'moment';
import {DateOfBirth} from "../../dob";

export function extractDob(dateString: string): DateOfBirth | null {
   const dateObj = moment(dateString, 'DD-MM-YYYY');

   if (!dateObj.isValid()) {
      return null; // Invalid date, return null
   }

   return {
      day: dateObj.date(),
      month: dateObj.month() + 1, // Months are zero-indexed, so add 1
      year: dateObj.year()
   };
}
