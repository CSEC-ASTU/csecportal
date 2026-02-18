"use client";
import { Calendar, NotepadText, SquareChartGantt, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const paths = pathName.split("/").filter(Boolean);
  return (
    <div className="size-full flex h-full flex-col items-center justify-between rounded-lg">
      <section className="w-full h-[35%]">
        <ProfileUpper
          name="Klaus Mikaelson"
          image="hello.png"
          role="Original Vampire"
          seen="two days ago"
        />
      </section>

      <section className="w-full h-[60%] flex flex-col lg:flex-row lg:justify-between">
        <div className="w-full lg:w-[15%] h-[[10%] lg:h-full flex lg:flex-col gap-2">
          <Link
            href={"/dashboard/profile"}
            className={`w-full flex items-center  gap-2 px-4 py-1 lg:py-3 rounded-md ${
              paths[2] === undefined && "text-white font-[600] bg-primary"
            }`}
          >
            <User />
            <span className="text-base">Profile</span>
          </Link>

          <Link
            href={"/dashboard/profile/attendance"}
            className={`w-full flex items-center  gap-2 px-4 py-1 lg:py-3 rounded-md  ${
              paths[2] === "attendance" && "text-white font-[600] bg-primary"
            }`}
          >
            <Calendar />
            <span className="text-base">Attendance</span>
          </Link>
          <Link
            href={"/dashboard/profile/progress"}
            className={`w-full flex items-center  gap-2 px-4 py-1 lg:py-3 rounded-md ${
              paths[2] === "progress" && "text-white font-[600] bg-primary"
            }`}
          >
            <SquareChartGantt />
            <span className="text-base">Progress</span>
          </Link>

          <Link
            href={"/dashboard/profile/heads-up"}
            className={`w-full flex items-center  gap-2 px-4 py-1 lg:py-3 rounded-md ${
              paths[2] === "heads-up" && "text-white font-[600] bg-primary"
            }`}
          >
            <NotepadText />
            <span className="text-base">Heads Up</span>
          </Link>
        </div>

        <div className="w-full lg:w-[84%] h-[90%] lg:h-full">{children}</div>
      </section>
    </div>
  );
}

interface IProfileUpper {
  name: string;
  image: string;
  role: string;
  seen: string;
}
function ProfileUpper({ name, image, role, seen }: IProfileUpper) {
  console.log(image);
  return (
    <div className="size-full relative bg-background3/[.8] ">
      <div className="flex items-center gap-3 absolute bottom-0 left-0 pl-6 translate-y-[15%] w-full]">
        <Avatar className="size-40 lg:size-44">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col itens-start gap-2">
          <h2 className="text-xl lg:text-2xl font-extrabold tracking-[1px] text-white">
            {name}
          </h2>
          <div className="flex items-center gap-3 text-gray-200">
            <p>{role}</p>
            <p>{seen}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
