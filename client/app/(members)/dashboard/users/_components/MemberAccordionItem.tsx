"use client";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
  name: string;
  role: string;
  image: string;
}

interface MemberAccordionProps {
  member: Member;
}

export default function MemberAccordion({ member }: MemberAccordionProps) {
  return (
    <div className="flex items-center justify-between py-2 px-0 group hover:bg-gray-100 rounded-md cursor-pointer">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-left">
          <h4 className="font-medium">{member.name}</h4>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 text-muted-foreground " />
    </div>
  );
}
