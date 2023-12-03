import React from "react";
import PropTypes from "prop-types";
import { NumerologyIndex } from "@/lib/constants";
import { INumerologyIndex, IndexType } from "@/app/interfaces";
import { Button } from "../ui/button";
import Link from "next/link";

function IndexList({ indexList }: { indexList?: INumerologyIndex[] }) {
  const IndexList: INumerologyIndex[] = indexList || NumerologyIndex;
  return (
    <div className="index-list-wrapper @container">
      {IndexList && IndexList.length > 0 && (
        <div className="flex flex-col items-center gap-3 lg:gap-5">
          <h3>Dach sách các chỉ số</h3>

          <div className="index-notes flex flex-wrap gap-4 my-5 font-fjalla text-sm lg:text-lg">
            <div className="border-2 rounded-2xl bg-white border-indexMain text-indexMain px-4 py-2 font-semibold">
              Chỉ Số Chính
            </div>
            <div className="border-2 rounded-2xl bg-white border-indexSecondary text-indexSecondary px-4 py-2 font-semibold">
              Chỉ Số Phụ
            </div>
            <div className="border-2 rounded-2xl bg-white border-indexOther text-indexOther px-4 py-2 font-semibold">
              Chỉ Số Khác
            </div>
          </div>

          <div className="index-list grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:gap-6 xl:grid-cols-6">
            {IndexList.map((item, index) => {
              const borderColor =
                item?.type === IndexType.Main
                  ? "border-indexMain"
                  : item?.type === IndexType.Secondary
                  ? "border-indexSecondary"
                  : "border-indexOther";

              const textColor =
                item?.type === IndexType.Main
                  ? "text-indexMain"
                  : item?.type === IndexType.Secondary
                  ? "text-indexSecondary"
                  : "text-indexOther";
              return (
                <Link
                  href={`/numIndex/${item.name}/${item?.value || item.id}`}
                  className={`index-item rounded-2xl shadow-lg
                bg-white hover:bg-slate-100 p-3 py-5 flex flex-col gap-1 
                aspect-square box-border items-center justify-between text-center border-4 ${borderColor} `}
                  key={index}
                  title={`Xem chi tiết Chỉ số ${item.title_vn} giá trị ${
                    item?.value || item.id
                  }`}
                >
                  <h4
                    className={`text-lg md:text-xl max-h-14 flex font-semibold font-fjalla
                    text-primary  ${textColor} line-clamp-1 whitespace-nowrap capitalize dark:text-slate-700`}
                  >
                    {item.title_vn}
                  </h4>
                  <h5
                    className="text-base  text-gray-500 line-clamp-1 capitalize"
                    title={item?.title_en}
                  >
                    {item?.title_en}
                  </h5>
                  <p
                    className={`text-7xl flex flex-1 items-end justify-center 
                    font-pattaya font-bold p-3 ${textColor}`}
                  >
                    {item?.value || item.id}
                  </p>
                </Link>
              );
            })}
          </div>

          <Button variant={"default"}>Xem Chi Tiết</Button>
        </div>
      )}
    </div>
  );
}

IndexList.propTypes = {};

export default IndexList;
