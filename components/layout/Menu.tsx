"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NumerologyIndex, components } from "@/lib/constants";



export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="left-[-100px]">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary-foreground">
            Các Chỉ Số
          </NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <ul
              className="nav-index grid w-[400px] gap-3 p-4 
            md:w-[500px] md:grid-cols-2 lg:w-[700px] lg:grid-cols-3 "
            >
              {NumerologyIndex.map((item, index) => (
                <ListItem
                  key={index}
                  title={`${item.title_vn} - ${item.title_en}`}
                  href={`/numIndex/${item.name}`}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary-foreground">
            Biểu Đồ
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/chart/name" title="Biểu Đồ Họ Tên">
                Xem chỉ số đường đời theo họ và tên của bạn.
              </ListItem>
              <ListItem href="/chart/birthday" title="Biểu Đồ Ngày Sinh">
                Xem chỉ số đường đời theo ngày sinh của bạn.
              </ListItem>
              <ListItem href="/chart/name-birthday" title="Biểu Đồ Tổng Hợp">
                Tổng hợp các chỉ số của bạn.
              </ListItem>
              <ListItem href="/chart/pyramid" title="Biểu Đồ Kim Tử Tháp">
                Kim tự tháp đường đời của bạn.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:flex">
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Tìm kiếm
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
