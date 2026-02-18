"use client";

import React from "react";
import Roles from "./Roles";
import { RulesManagement } from "./Rules";
import Heads from "./Heads";
import PresidentMemberAdministration from "./president-member-administration";
import PresidentDivisionAdministrations from "./president-division-administration";
import { FaqManagement } from "./faq-administrations";
import EventAdministrations from "./event-administration";
import VoteAdministrations from "./vote-administrations";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { TestimonialManagement } from "./testiomonial-administrations";

export default function PresidentAdministrationMain() {
  const type = useSelector(
    (state: RootState) => state.presidentAdminLink.activeSlug
  );

  const renderComponent = () => {
    switch (type) {
      case "members":
        return <PresidentMemberAdministration />;
      case "heads":
        return <Heads />;
      case "rules":
        return <RulesManagement />;
      case "roles":
        return <Roles />;
      case "vote":
        return <VoteAdministrations />;
      case "testimonials":
        return <TestimonialManagement />;
      case "faq":
        return <FaqManagement />;
      case "divisions":
        return <PresidentDivisionAdministrations />;
      case "events":
        return <EventAdministrations />;
      default:
        return <div>Select an option from the menu.</div>;
    }
  };

  return <div className="size-full">{renderComponent()}</div>;
}
