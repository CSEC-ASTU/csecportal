/*   */
import Image from "next/image";
import React from "react";

interface IVoteOverviewPerson {
  data: any;
}

export default function VoteOverviewPerson({ data }: IVoteOverviewPerson) {
  const fullName = `${data?.name?.title || ""} ${data?.name?.first || ""} ${
    data?.name?.last || ""
  }`;

  return (
    <div
      className="group w-[90%] md:w-[31%] lg:w-[23%] 2xl:w-[17%] shrink-0 p-3 shadow-md border border-gray-300 dark:border-gray-700 
      rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out 
      flex flex-col gap-4 items-center bg-primary/[.1] cursor-pointer"
    >
      <div className="relative w-full rounded-xl overflow-hidden aspect-square border border-gray-200">
        <Image
          src={data?.picture?.large || "/placeholder.jpg"}
          alt="election candidate"
          width={400}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center text-center w-full gap-1">
        <h3 className="text-lg font-semibold text-neutral-800 transition">
          {fullName}
        </h3>
        <p className="text-sm font-medium text-neutral-600">3rd Year Student</p>
      </div>
    </div>
  );
}
