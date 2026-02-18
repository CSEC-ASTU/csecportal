"use client";
import { useState } from "react";
import { ExternalLink, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Add from "@/components/Add";
import AddResourcePopup from "./AddResourcePopup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RootState } from "@/lib/features/store";
import { useSelector } from "react-redux";

interface Resource {
  id: string;
  name: string;
  link: string;
}

interface DivisionProps {
  name: string;
  description: string;
  resources: Resource[];
}

export function DivisionsResource({
  name,
  description,
  resources,
}: DivisionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.user.role);
  const allowedRoles = ["President", "Vice President", "Division Head"];

  // const {} = useGetResourcesByDivisionQuery();

  const handleEdit = (id: string) => {
    console.log(`Editing resource ${id}`);
  };

  return (
    <div className="w-full rounded-lg mb-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        {allowedRoles.includes(userRole) && isAccordionOpen && (
          <Add Popup={AddResourcePopup} title={"Add Resources"} />
        )}
      </div>

      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setIsAccordionOpen(!!value)}
        className="space-y-4"
      >
        <AccordionItem value="resources" className="border-0">
          <AccordionTrigger className="[&[data-state=open]>svg:rotate-180">
            <div className="flex items-center justify-between w-full">
              <span>Resources({resources.length})</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-0 pt-2">
            <div className="space-y-2 border rounded-lg p-2 px-7">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex justify-between items-center p-3 w-full rounded"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Link
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{resource.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {resource.link}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(resource.id);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
