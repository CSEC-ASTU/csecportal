import React from "react";
import {
  AlertCircle,
  Clock,
  HeartPulse,
  WifiOff,
  Car,
  CalendarX2,
  AlertTriangle,
  BellOff,
  MessageSquareWarning,
  Luggage,
} from "lucide-react";

const missedSessions = [
  {
    title: "Traffic Delay",
    explanation:
      "The participant was stuck in heavy traffic and couldn't arrive on time.",
    icon: <Car className="w-5 h-5 text-amber-500" />,
  },
  {
    title: "Health Issues",
    explanation:
      "The participant was feeling unwell and needed to rest to recover.",
    icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
  },
  {
    title: "Scheduling Conflict",
    explanation:
      "Another important meeting or event overlapped with the session time.",
    icon: <CalendarX2 className="w-5 h-5 text-violet-500" />,
  },
  {
    title: "Technical Difficulties",
    explanation:
      "The participant faced issues with their device or internet connection, preventing them from joining.",
    icon: <WifiOff className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Family Emergency",
    explanation:
      "A sudden family emergency required the participant to leave unexpectedly.",
    icon: <AlertCircle className="w-5 h-5 text-red-500" />,
  },
  {
    title: "Unforeseen Workload",
    explanation:
      "The participant was overwhelmed with urgent work and couldn't attend the session.",
    icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  },
  {
    title: "Personal Commitment",
    explanation:
      "A prior personal commitment conflicted with the session schedule.",
    icon: <Clock className="w-5 h-5 text-emerald-500" />,
  },
  {
    title: "Forgot to Set a Reminder",
    explanation:
      "The participant simply forgot about the session as they didn't set a reminder.",
    icon: <BellOff className="w-5 h-5 text-yellow-500" />,
  },
  {
    title: "Miscommunication",
    explanation:
      "There was a misunderstanding about the session time or location, leading to the absence.",
    icon: <MessageSquareWarning className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "Traveling",
    explanation:
      "The participant was traveling during the session and unable to attend.",
    icon: <Luggage className="w-5 h-5 text-cyan-500" />,
  },
];

export default function HeadsUp() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 h-[6%]">
        <h2 className="text-xl font-bold text-gray-800">
          Missed Session Reasons
        </h2>
        <p className="text-sm text-gray-500">
          Review your heads up when you missed sessions
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 h-[94%]">
        {missedSessions.map((el, i) => (
          <HeadsUpCard
            key={i}
            title={el.title}
            explanation={el.explanation}
            icon={el.icon}
          />
        ))}
      </div>
    </div>
  );
}

const HeadsUpCard = function ({
  title,
  explanation,
  icon,
}: {
  title: string;
  explanation: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-start gap-4 p-5 rounded-xl border  transition-all hover:shadow-sm`}
    >
      <div className="p-2.5 rounded-lg  shadow-xs border border-primary/[.1]">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-base font-semibold text-gray-800 mb-1.5">
          {title}
        </h4>
        <p className="text-sm text-gray-600">{explanation}</p>
      </div>
    </div>
  );
};
