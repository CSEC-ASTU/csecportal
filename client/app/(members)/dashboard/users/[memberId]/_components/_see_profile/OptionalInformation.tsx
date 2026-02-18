import { TOptionalInformation } from "@/data/users.data";

interface IOptionalInformation {
  optionalData: TOptionalInformation;
}
export default function OptionalInformation({
  optionalData,
}: IOptionalInformation) {
  console.log(optionalData);
  return (
    <div className="size-full flex flex-wrap justif-between gap-y-4">
      <RequiuredInfo
        slug="University Handle"
        value={optionalData?.university_id || ""}
      />
      <RequiuredInfo
        slug="Instagram Handle"
        value={optionalData?.instagram_handle || ""}
      />
      <RequiuredInfo
        slug="Linkedin Account"
        value={optionalData?.linkedin_account || ""}
      />
      <RequiuredInfo
        slug="Birth Date"
        value={String(optionalData?.birthdate || "") || ""}
      />
      <RequiuredInfo
        slug="Codeforces Handle"
        value={optionalData?.codeforce_handle || ""}
      />
      <RequiuredInfo slug="Cv" value={optionalData?.cv || ""} />
      <RequiuredInfo
        slug="Leetcode Handle Handle"
        value={optionalData?.leetcode || ""}
      />
      <RequiuredInfo
        slug="Joining Date"
        value={String(optionalData?.joining_date || "")}
      />
      <RequiuredInfo slug="specialization" value={"Developer "} />
      <RequiuredInfo
        slug="Department"
        value={"Computer Science and Engineering"}
      />
      <RequiuredInfo slug="Mentor" value={optionalData?.bio || ""} />
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
