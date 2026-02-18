"use client";
import { Accordion } from "@/components/ui/accordion";
import Link from "next/link";
import MemberAccordion from "../../../users/_components/MemberAccordionItem";
import { Group } from "@/data/division-group.data";
import { students } from "@/data/users.data";

interface IGroupCard {
  group: Group;
  divisionId: string;
}

export default function GroupCard({ group, divisionId }: IGroupCard) {
  const transformedStudents = students.map((student) => ({
    name: `${student.required.first_name} ${student.required.last_name}`,
    image: student.required.image,
    role: student.role,
    division: student.divisions[0]?.division,
    group: student.divisions[0]?.group,
  }));

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{group.name}</h3>
        <Link
          href={`/dashboard/all-divisions/${divisionId}/${group.slug}`}
          className="text-blue-500 text-sm flex items-center hover:text-blue-700 transition-colors cursor-pointer"
        >
          View All
        </Link>
      </div>

      <p className="text-gray-600 text-sm mb-4">{group.memberCount} Members</p>

      <Accordion type="multiple" className="w-full">
        {transformedStudents.slice(0, 5).map((student, index) => (
          <MemberAccordion
            key={`${group.id}-${student.name}-${index}`}
            member={student}
          />
        ))}
      </Accordion>
    </div>
  );
}
