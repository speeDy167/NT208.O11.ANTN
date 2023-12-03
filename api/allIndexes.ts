import {
   lifePath,
   birthDay,
   attitude,
   expression,
   soulUrge,
   personality
} from "@/lib/index/main";
import {
   adversityResilience,
   thinkingCapacity,
   missingNumber,
   getKarmicDebtNumber,
   maturity,
   maturityCapacity,
   soulChallenge,
   personalityChallenge,
   expressionChallenge
} from "@/lib/index/additional";
import {
   accessibilityMotivation,
   accessibilityCapacity,
   accessibilityAttitude
} from "@/lib/index/other/accessibility";
import { getName, validateName } from "@/lib/validate/name";
import { extractDob} from "@/lib/validate/dob";
import { NumerologyIndex } from "@/lib/constants";
import {INumerologyIndex} from "@/app/interfaces";

export function getAllIndexes(name: string, dob: string): INumerologyIndex[] {
   const Indexes = new Map();
   const dobObj = extractDob(dob);
   const processedName = getName(name);
   if (!validateName(name) || dobObj === null) {
      return NumerologyIndex;
   }

   // Main indexes
   Indexes.set('lifePath', lifePath(dobObj));
   Indexes.set('birthDay', birthDay(dobObj));
   Indexes.set('attitude', attitude(dobObj));
   Indexes.set('expression', expression(processedName));
   Indexes.set('soulUrge', soulUrge(processedName));
   Indexes.set('personality', personality(processedName));
   Indexes.set('karmicDebtNumber', getKarmicDebtNumber()); //Export Karmic Debt after calculate 6 main indexes

   // Additional Indexes
   Indexes.set('expressionChallenge', expressionChallenge(processedName));
   Indexes.set('soulChallenge', soulChallenge(processedName));
   Indexes.set('personalityChallenge', personalityChallenge(processedName));
   Indexes.set('adversityResilience', adversityResilience(processedName));
   Indexes.set('thinkingCapacity', thinkingCapacity(dobObj, processedName));
   Indexes.set('maturity', maturity(processedName, dobObj));
   Indexes.set('maturityCapacity', maturityCapacity(processedName, dobObj));
   Indexes.set('missingNumber', missingNumber(processedName));

   // Other Indexes
   Indexes.set('accessibilityCapacity', accessibilityCapacity(processedName));
   Indexes.set('accessibilityMotivation', accessibilityMotivation(processedName));
   Indexes.set('accessibilityAttitude', accessibilityAttitude(processedName));

   NumerologyIndex.forEach(function (numerology) {
      numerology.value = Indexes.get(numerology.name);
   });

   return NumerologyIndex;
}
