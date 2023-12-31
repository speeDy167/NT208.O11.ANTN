import React from "react";
import FormCard from "@/components/FormCard";
import BackgroundAnimation from "@/components/BackgroundAnimation";

function HomePage() {
  return (
    <div className="home-page flex flex-col flex-1 justify-center items-center h-full">
      <BackgroundAnimation />
      <div className="flex flex-1 items-center relative z-50">
        <FormCard />
      </div>
    </div>
  );
}

HomePage.propTypes = {};

export default HomePage;
