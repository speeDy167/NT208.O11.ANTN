"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NumerologyIndex } from "@/lib/constants";
import { animated, useSpring } from "@react-spring/web";
import IndexList from "@/components/numerology/IndexList";

function findNumerologyBySlug(slug: string) {
  return NumerologyIndex.find((element) => {
    return element.name === slug;
  });
}

function NumerologyIndexDetailPage({
  params,
}: {
  params: { slug: string; value: string };
}) {
  const NumerologyInfo = findNumerologyBySlug(params.slug);
  const [background, setBackground] = useState<string>();

  const styleDesc = useSpring({
    from: { opacity: 0, top: 100 },
    to: { opacity: 1, top: 0 },
    delay: 1000,
    config: { duration: 100 },
  });

  useEffect(() => {
    setBackground(
      Number.parseInt(params?.value) < 10
        ? "/bg/background-0" + params?.value + ".png"
        : "/bg/background-" + params?.value + ".png"
    );
  }, [params?.value]);

  return (
    <div
      className="page-wrapper page-numerology-index p-5 lg:p-10  bg-center bg-fixed	 bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="main container text-center"></div>

      <div
        className="number-description relative max-w-7xl m-auto w-full p-2 lg:p-5 bg-white/70 dark:bg-slate-500/80 rounded-xl shadow-sm text-lg"
        //style={styleDesc}
      >
        <h1 className="page-title">
          Chỉ số {NumerologyInfo?.title_vn} giá trị {params.value}
        </h1>

        <p className="text-3xl font-great">
          Diễn giải thông tin Chỉ số {NumerologyInfo?.title_vn} giá trị{" "}
          {params.value}{" "}
        </p>
        <IndexList />
      </div>

      <div className="h-[1000px]"></div>

      <animated.div
        className="number-description relative max-w-7xl m-auto w-full p-2 lg:p-5 bg-white/80 dark:bg-slate-500/80 rounded-xl shadow-sm text-lg"
        style={styleDesc}
      >
        <div className="page-title text-blue-500">Demo Background</div>
      </animated.div>
    </div>
  );
}

NumerologyIndexDetailPage.propTypes = {};

export default NumerologyIndexDetailPage;
