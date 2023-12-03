import {removeAccents} from "../../utils/removeAccents";

export function validateName(name: string): boolean {
   const alphabeticPattern = /^[A-Za-z]+$/;
   return alphabeticPattern.test(getName(name).replace(/\s/g, ''));
}

export function getName(name: string): string {
   return removeAccents(name);
}
