import { RequiredInformation } from "@/data/users.data";
import React from "react";

interface IRequiredINformations {
  requiredData: RequiredInformation;
}

export default function RequiredInformations({
  requiredData,
}: IRequiredINformations) {
  console.log(requiredData);
  console.log(requiredData);
  return (
    <div className="size-full flex flex-wrap justif-between gap-y-4">
      <RequiuredInfo slug="First Name" value={requiredData.first_name} />
      <RequiuredInfo slug="Last Name" value={requiredData.last_name} />
      <RequiuredInfo slug="Mobile Number" value={requiredData.mobile_number} />
      <RequiuredInfo slug="Email Address" value={requiredData.email_address} />
      <RequiuredInfo slug="Date Of Birth" value={requiredData.date_of_birth} />
      <RequiuredInfo slug="Gender" value={requiredData.gender} />
      <RequiuredInfo
        slug="Telegram Handle"
        value={requiredData.telegram_handle}
      />
      <RequiuredInfo
        slug="Expected Graduation Year"
        value={String(requiredData.graduation_year)}
      />
      <RequiuredInfo slug="specialization" value={"backend development"} />
      <RequiuredInfo
        slug="Department"
        value={"Computer Science and Engineering"}
      />
      <RequiuredInfo slug="Mentor" value={requiredData.mentor} />
    </div>
  );
}

interface IRequiredInfo {
  slug: string;
  value: string;
}

const RequiuredInfo = function ({ slug, value }: IRequiredInfo) {
  return (
    <div className="w-full lg:w-[48%] flex flex-col items-start p-2">
      <span className="text-xs lg:text-sm tracking-[1px] text-text2">
        {slug}
      </span>
      <span className="text-xs lg:text-base tracking-[1px]  ">{value}</span>
    </div>
  );
};
