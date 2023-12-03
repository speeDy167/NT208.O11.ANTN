"use client";
import { getAllIndexes } from "@/api/allIndexes";
//import FormCard from "@/components/FormCard";
//import FormInfo from "@/components/FormInfo";
import NumberAnimation from "@/components/NumberAnimation";
import IndexList from "@/components/numerology/IndexList";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataSoChuDao } from "@/lib/data-sochudao";
import { CalcMainNumber, IMainNumber } from "@/lib/numerology";
import { useSpring, animated } from "@react-spring/web";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { INumerologyIndex } from "../interfaces";

const getDescription = (number: number) => {
  const descFilter = DataSoChuDao.filter((item) => {
    return item.value == number;
  });
  if (descFilter) {
    return descFilter[0]?.description;
  }
  return "";
};

function NumerologyByName() {
  const searchParams = useSearchParams();
  //console.log(searchParams);
  const fullName = searchParams.get("name");
  const birthday = searchParams.get("birthday");
  const [loading, setLoading] = useState<boolean>();
  const [mainNumber, setMainNumber] = useState<IMainNumber>();

  const [resultIndexs, setResultIndexes] = useState<INumerologyIndex[]>([]);
  const [bg, setBackground] = useState<string>();

  const styleDesc = useSpring({
    from: { opacity: 0, top: 100 },
    to: { opacity: 1, top: 0 },
    delay: 4000,
    config: { duration: 2000 },
  });

  useEffect(() => {
    setLoading(true);
    const calcNumber = (birthday: string) => {
      const calcNumber = CalcMainNumber(birthday);
      setMainNumber(calcNumber);
      setLoading(false);
    };

    if (birthday && birthday != null) {
      calcNumber(birthday);
    }

    if (fullName && birthday) {
      const results = getAllIndexes(fullName, birthday);
      setResultIndexes(results);
    }

    if (mainNumber && mainNumber?.main_number)
      setBackground(
        mainNumber.main_number < 10
          ? "/bg/background-0" + mainNumber.main_number + ".png"
          : "/bg/background-" + mainNumber.main_number + ".png"
      );
  }, [birthday, loading]);

  const FormInfo = dynamic(() => import("@/components/FormInfo"), {
    ssr: false,
  });

  return (
    <>
      <FormInfo name={fullName} birthday={birthday} />
      {/* { bg-gradient-to-tr from-rose-400 to-orange-300 } */}
      <div
        className={`search-by-name flex flex-col gap-5 p-5 lg:p-10 min-h-[90vh] bg-center bg-fixed	 bg-cover`}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="page-title !text-yellow-400 lg:mb-8">
          Thần số học theo Tên
        </h1>
        <Card className="m-auto flex flex-col w-full max-w-[1440px] border bg-white/90 dark:bg-slate-500/80 shadow-lg p-5 lg:p-10">
          <CardHeader className="hidden">
            <h2>Thông tin Thần số học của bạn: </h2>
          </CardHeader>
          <CardContent className="p-0">
            <div className="search-info text-xl flex flex-col gap-3 lg:text-3xl">
              {fullName && (
                <div className="flex gap-2">
                  <strong className="w-1/4  min-w-[120px]">Họ tên:</strong>
                  <span>{fullName}</span>
                </div>
              )}
              {birthday && (
                <div className="flex gap-2 ">
                  <strong className="w-1/4 min-w-[120px]">Ngày sinh:</strong>
                  <span>{birthday}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="main-number m-auto w-full max-w-[1440px] flex flex-col justify-center items-center gap-5">
          <div className="w-full p-4 lg:p-8 bg-white/80 dark:bg-slate-500/80 rounded-xl shadow-sm text-lg flex gap-5 justify-between flex-col lg:flex-row">
            <div className="flex flex-col gap-4 justify-center items-center lg:w-1/2">
              <h2 className="text-2xl lg:text-3xl font-bold">
                Con Số Chủ Đạo Của Bạn
              </h2>
              {mainNumber &&
                mainNumber?.steps &&
                mainNumber.steps.length > 0 && (
                  <ul className="steps text-lg lg:text-2xl flex flex-col justify-center items-right">
                    {mainNumber.steps.map((step, index) => (
                      <li key={index}>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <div
              className="main-number m-auto rounded-full border-8 border-gray-200 bg-slate-300 
        w-52 h-52 flex items-center justify-center shadow-md
        bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400
        "
            >
              <h3 className="text-[96px] text-white font-bold">
                {/* {mainNumber?.main_number} */}
                {mainNumber?.step_number && (
                  <NumberAnimation arrNumber={mainNumber.step_number} />
                )}
              </h3>
            </div>
          </div>

          <div className="number-detail ">
            {!loading && mainNumber?.main_number && (
              <animated.div
                className="number-description relative w-full p-10 lg:p-12 bg-white/80 dark:bg-slate-500/80 rounded-xl shadow-sm text-lg"
                style={styleDesc}
              >
                <h4 className="text-xl lg:text-3xl text-primary font-semibold mb-5">
                  Con Số Chủ Đạo:{" "}
                  <span className="font-bold">{mainNumber.main_number}</span>{" "}
                </h4>
                {getDescription(mainNumber.main_number)}
              </animated.div>
            )}
          </div>

          <animated.div
            className="number-description relative w-full p-2 lg:p-5 bg-white/80 dark:bg-slate-500/80 rounded-xl shadow-sm text-lg"
            style={styleDesc}
          >
            <IndexList indexList={resultIndexs} />
          </animated.div>

          <animated.div
            className="number-description relative w-full p-5 bg-white/80 dark:bg-slate-500/80 rounded-xl shadow-sm text-lg"
            style={styleDesc}
          >
            <h5 className="text-lg lg:text-xl text-primary font-bold flex items-center justify-center p-5">
              Cảm ơn bạn đã xem. Chúc bạn luôn vui vẻ, hạnh phúc :){" "}
            </h5>
          </animated.div>
        </div>
      </div>
    </>
  );
}

export default memo(NumerologyByName);
