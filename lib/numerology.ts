import { INumerologyIndex } from "@/app/interfaces";
import { NumerologyIndex } from "./constants";

export interface IMainNumber {
  main_number: number;
  steps: string[];
  step_number: number[];
}

export function CalcMainNumber(birthday: string): IMainNumber {
  //birthday = "22/12/1995";
  let result: IMainNumber = {
    main_number: 0,
    steps: [],
    step_number: [],
  };

  let arrDate = birthday.replaceAll("-", "").replaceAll("/", "");
  let mainNumber: number = 0;

  //   arrDate.forEach((item) => {
  //     item = item.slice(-2);
  //     console.log(item);
  //     soChuDao = soChuDao + convertStrToNumber(item);
  //     console.log(soChuDao);
  //   });

  let strStep = "";
  for (let i = 0; i < arrDate.length; i++) {
    strStep += arrDate[i];
    if (i < arrDate.length - 1) strStep += " + ";
    mainNumber = mainNumber + Number(arrDate[i]);
    //console.log(mainNumber);
  }
  strStep += " = " + mainNumber;
  result.steps.push(strStep);
  result.step_number.push(mainNumber);

  while (mainNumber > 11) {
    let strMainNumber: string = mainNumber.toString();
    mainNumber = convertStrToNumber(strMainNumber);
    strStep =
      strMainNumber[0] +
      " + " +
      strMainNumber[1] +
      " = " +
      mainNumber.toString();

    result.step_number.push(mainNumber);
    result.steps.push(strStep);
  }

  result.main_number = mainNumber;

  return result;
}

function convertStrToNumber(str: string): number {
  let result: number = 0;
  for (let i = 0; i < str.length; i++) {
    result = result + Number(str[i]);
  }
  return result;
}

function findNumerologyIndexBySlug(slug: string) {
  // return array.find((element) => {
  //   return element.title === title;
  // })

  return NumerologyIndex.find((element) => {
    return element.name === slug;
  });
}
