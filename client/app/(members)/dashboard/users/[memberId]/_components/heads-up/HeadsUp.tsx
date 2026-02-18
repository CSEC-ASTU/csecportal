/*   */
import React from "react";
const missedSessions = [
  {
    title: "Traffic Delay",
    explanation:
      "The participant was stuck in heavy traffic and couldn't arrive on time.",
  },
  {
    title: "Health Issues",
    explanation:
      "The participant was feeling unwell and needed to rest to recover.",
  },
  {
    title: "Scheduling Conflict",
    explanation:
      "Another important meeting or event overlapped with the session time.",
  },
  {
    title: "Technical Difficulties",
    explanation:
      "The participant faced issues with their device or internet connection, preventing them from joining.",
  },
  {
    title: "Family Emergency",
    explanation:
      "A sudden family emergency required the participant to leave unexpectedly.",
  },
  {
    title: "Unforeseen Workload",
    explanation:
      "The participant was overwhelmed with urgent work and couldn't attend the session.",
  },
  {
    title: "Personal Commitment",
    explanation:
      "A prior personal commitment conflicted with the session schedule.",
  },
  {
    title: "Forgot to Set a Reminder",
    explanation:
      "The participant simply forgot about the session as they didn't set a reminder.",
  },
  {
    title: "Miscommunication",
    explanation:
      "There was a misunderstanding about the session time or location, leading to the absence.",
  },
  {
    title: "Traveling",
    explanation:
      "The participant was traveling during the session and unable to attend.",
  },
];

export default function HeadsUp() {
  return (
    <div className="size-full flex flex-col gap-4 overflow-y-auto">
      {missedSessions.map((el, i) => (
        <HeadsUpOne title={el.title} explanation={el.explanation} key={i} />
      ))}
    </div>
  );
}

const HeadsUpOne = function ({ title, explanation }: any) {
  return (
    <div className="flex flex-col items-start gap-2 pl-5 lg:pl-16  py-4 lg:py-7 border-l-[4px] border-l-primary`">
      <h4 className="text-sm lg:text-base font-extrabold tracking-[1px]">
        {title}
      </h4>
      <p>{explanation}</p>
    </div>
  );
};
