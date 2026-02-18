interface IRequiredInfomtion {
  first_name: string;
  last_name: string;
  mobile_number: string;
  email_address: string;
  date_of_birth: string;
  github: string;
  gender: string;
  telegram_handle: string;
  graduation_year: number;
  specialization: string;
  department: string;
  mentor: string;
  bio: string;
}
export default function OptionalInformation(requiredData: IRequiredInfomtion) {
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
