import React from "react";
import PresidentAdministrationHeader from "./_president_administrations/head/header";
import PresidentAdministrationMain from "./_president_administrations/main/main";

export default function PresidentAdministration() {
  return (
    <div className="size-full flex flex-col ">
      <div className="w-full h-[5%] flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold tracking-[1px]">
          President Administration
        </h2>
      </div>

      <div className="w-full h-[95%]">
        <div className="w-full h-[10%]">
          <PresidentAdministrationHeader />
        </div>

        <div className="w-full h-[90%]">
          <PresidentAdministrationMain />
        </div>
      </div>
    </div>
  );
}
