import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="header sticky top-0 z-50 shadow-sm bg-black">
      <div className="header-container max-w-7xl mx-auto px-5 h-16 flex justify-between items-center">
        <div className="logo flex items-center">
          <Link href="/" className="text-xl font-bold flex items-center">
            <Image
              src="/logo.png"
              alt="Thần Số Học"
              width="64"
              height="50"
              className="max-h-12 md:max-h-16 overflow-hidden"
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

export default Header;
