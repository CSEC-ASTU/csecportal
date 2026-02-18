import React from "react";

import HeadAdministrationHeader from "./_head-administrations/headers/header";
import HeadAdministrationMain from "./_head-administrations/main/main";

export default function HeadAdministration() {
  return (
    <div className="size-full flex flex-col ">
      <div className="w-full h-[5%] flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold tracking-[1px]">
          Division Head Administration
        </h2>
      </div>

      <div className="w-full h-[95%]">
        <div className="w-full h-[5%]">
          <HeadAdministrationHeader />
        </div>

        <div className="w-full h-[95%]">
          <HeadAdministrationMain />
        </div>
      </div>
    </div>
  );
}
