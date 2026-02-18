import React, { useState } from "react";
import { Users, UserPlus, UserX, Settings } from "lucide-react";
import MemberPage from "@/app/(members)/dashboard/users/_components/MemberPage";
import DeleteMemberRequests from "./members/delete-member-requests";
import AddNewMembers from "./members/Add-new-members";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { useGetVerifiedMembersQuery } from "@/lib/features/api";

export default function PresidentMemberAdministration() {
  const [activeTab, setActiveTab] = useState("members");

  const { page, limit, search } = useSelector(
    (state: RootState) => state?.pagination
  );
  const { data: membersResponse, isLoading } = useGetVerifiedMembersQuery({
    page,
    limit,
    search,
  });

  const tabs = [
    {
      id: "members",
      label: "Member Management",
      icon: <Users className="w-4 h-4 mr-2" />,
      component: (
        <MemberPage
          members={membersResponse?.data?.user || []}
          membersLoading={isLoading}
          right={false}
          total={membersResponse?.data?.meta?.total || 10}
        />
      ),
    },
    {
      id: "add",
      label: "Add New Members",
      icon: <UserPlus className="w-4 h-4 mr-2" />,
      component: <AddNewMembers />,
      highlight: true,
    },
    {
      id: "delete",
      label: "Delete Requests",
      icon: <UserX className="w-4 h-4 mr-2" />,
      component: <DeleteMemberRequests />,
    },
  ];

  return (
    <div className="w-full p-2">
      <div className="w-full mx-auto mb-2">
          <div className="border-b mb-5">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-1 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "text-text1 border-b border-b-text1" : "border-transparent text-text2"
                  } ${tab.highlight ? "font-semibold" : ""}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
                </nav>
            </div>

        <div className="rounded-lg border  overflow-hidden">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>

      </div>
    </div>
  );
}
