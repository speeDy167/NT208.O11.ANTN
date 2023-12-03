import {sumDigit} from "@/lib/utils/sumDigit";
import {DateOfBirth} from "@/lib/dob";
import {expression} from "@/lib/index/main";
import {lifePath} from "../main/lifePath";

export function maturity(name: string, dobObject: DateOfBirth): number {
    return sumDigit(lifePath(dobObject) + expression(name), true);
}

export function maturityCapacity(name: string, dobObject: DateOfBirth): number {
    return sumDigit(Math.abs(lifePath(dobObject) - expression(name)) + 9);
}
