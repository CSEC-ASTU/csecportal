"use client";
import { usePathname } from "next/navigation";

import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Header = function () {
  return (
    <header className="w-full flex justify-between">
      <HeaderInfo />

      <div className="flex items-center gap-2">
        <HeaderInput />
        <HeaderNotifications />
        <HeaderProfile name="hello" image="hello" role="developer" />
      </div>
    </header>
  );
};

const HeaderInfo = function () {
  const pathName = usePathname();

  const paths = pathName.split("/").filter(Boolean);

  const displayPaths = paths[0] === "dashboard" ? paths.slice(1) : paths;

  const formatSegment = (segment: string) =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  let cumulativePath = "/dashboard"; // always starts from dashboard

  return (
    <div className="flex flex-col">
      <span className="text-base lg:text-xl tracking-[1px] font-[600]">
        All Members
      </span>
      <Breadcrumb>
        <BreadcrumbList>
          {displayPaths.map((el, i) => {
            cumulativePath += `/${el}`;
            const isLast = i === displayPaths.length - 1;

            return (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink href={cumulativePath}>
                  {formatSegment(el)}
                </BreadcrumbLink>
                {!isLast && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

const HeaderInput = function () {
  return (
    <form>
      <Input />
    </form>
  );
};

const HeaderNotifications = function () {
  return (
    <div className="bg-background3/[.1] p-2 lg:p-3 rounded-md">
      <Bell className="size-5 lg:size-6" />
    </div>
  );
};
interface IHeaderProfile {
  name: string;
  image: string;
  role: string;
}

const HeaderProfile = function ({}: IHeaderProfile) {
  return (
    <div className="h-12 lg:h-13 rounded-sm p-1 flex gap-2 border-[1px] border-background2">
      <Avatar className="size-12 lg:size-13">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="h-full flex flex-col items-start gap-1 ">
        <h4 className="text-sm lg:text-base font-bold tracking-[1px]">
          Kaus Mikaelson
        </h4>
        <p className="text-xs lg:text-sm  tracking-[1px]">Original Vampire</p>
      </div>
    </div>
  );
};
