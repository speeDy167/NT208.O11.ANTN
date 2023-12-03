import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

function Header() {

  return (
    <header className="header sticky top-0 z-50 shadow-sm width-full bg-black">
      <div className="header-container max-w-7xl m-auto flex justify-between items-center px-5 h-16">
        <div className="logo">
          <Link href="/" className="text-xl font-bold flex gap-4 items-center">
            <Image
              src="/logo.png"
              alt="Thần Số Học"
              width="64"
              height="50"
              style={{ objectFit: "cover" }}
              className="max-h[50px] overflow-hidden"
            />
            <span className="font-pattaya hidden md:block text-xl lg:text-3xl text-white hover:opacity-80">
              Thần Số Học
            </span>
          </Link>
        </div>
        <div className="navigation-menu hidden md:flex">
          <Menu />
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
