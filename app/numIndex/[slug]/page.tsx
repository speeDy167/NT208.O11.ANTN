import React from "react";
import { NumerologyIndex } from "@/lib/constants";
import { replaceWithBr, replaceWithP } from "@/lib/utils";
import IndexList from "@/components/numerology/IndexList";
import { INumerologyIndex } from "@/app/interfaces";

function findNumerologyBySlug(slug: string) {
  return NumerologyIndex.find((element) => {
    return element.name === slug;
  });
}

function NumerologyIndexPage({ params }: { params: { slug: string } }) {
  const NumerologyInfo = findNumerologyBySlug(params.slug);

  return (
    <div className="page-wrapper page-numerology-index p-5 lg:p-10">
      <h1 className="page-title">
        Chỉ Số {NumerologyInfo?.title_vn} - {NumerologyInfo?.title_en}
      </h1>

      {/* <p>{NumerologyInfo?.description}</p> */}
      <div className="page-container m-auto max-w-7xl">
        <p
          className="my-5 [&>p]:mb-4"
          dangerouslySetInnerHTML={{
            __html: replaceWithBr(NumerologyInfo?.description || ""),
          }}
        />

        <IndexList />
      </div>
    </div>
  );
}

export default NumerologyIndexPage;
