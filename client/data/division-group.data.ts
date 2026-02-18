export type Group = {
  id: string;
  name: string;
  slug: string;
  memberCount: number;
};

export type Division = {
  id: string;
  slug: string;
  name: string;
  totalMembers: number;
  groups: Group[];
};

export const divisions: Division[] = [
  {
    id: "div-1",
    slug: "development",
    name: "Development Division",
    totalMembers: 150,
    groups: [
      {
        id: "dev-1",
        name: "Web Development",
        slug: "web-dev",
        memberCount: 50,
      },
      {
        id: "dev-2",
        name: "Mobile Development",
        slug: "mobile-dev",
        memberCount: 40,
      },
      {
        id: "dev-3",
        name: "Game Development",
        slug: "game-dev",
        memberCount: 30,
      },
      {
        id: "dev-4",
        name: "Open Source",
        slug: "open-source",
        memberCount: 30,
      },
    ],
  },
  {
    id: "div-2",
    slug: "competitive-programming",
    name: "Competitive Programming Division",
    totalMembers: 80,
    groups: [
      {
        id: "cp-1",
        name: "Algorithm Experts",
        slug: "algorithms",
        memberCount: 30,
      },
      {
        id: "cp-2",
        name: "Programming Contestants",
        slug: "contestants",
        memberCount: 35,
      },
      {
        id: "cp-3",
        name: "Problem Setters",
        slug: "problem-setters",
        memberCount: 15,
      },
    ],
  },
  {
    id: "div-3",
    slug: "cyber-security",
    name: "Cyber Security Division",
    totalMembers: 65,
    groups: [
      {
        id: "sec-1",
        name: "Red Team",
        slug: "red-team",
        memberCount: 25,
      },
      {
        id: "sec-2",
        name: "Blue Team",
        slug: "blue-team",
        memberCount: 25,
      },
      {
        id: "sec-3",
        name: "Forensics",
        slug: "forensics",
        memberCount: 15,
      },
    ],
  },
  {
    id: "div-4",
    slug: "data-science",
    name: "Data Science Division",
    totalMembers: 90,
    groups: [
      {
        id: "ds-1",
        name: "Machine Learning",
        slug: "ml",
        memberCount: 40,
      },
      {
        id: "ds-2",
        name: "Data Engineering",
        slug: "data-eng",
        memberCount: 30,
      },
      {
        id: "ds-3",
        name: "Data Visualization",
        slug: "data-viz",
        memberCount: 20,
      },
    ],
  },
  {
    id: "div-5",
    slug: "capacity-building",
    name: "Capacity Building Division",
    totalMembers: 70,
    groups: [
      {
        id: "cb-1",
        name: "Training Team",
        slug: "training",
        memberCount: 30,
      },
      {
        id: "cb-2",
        name: "Mentorship Program",
        slug: "mentorship",
        memberCount: 25,
      },
      {
        id: "cb-3",
        name: "Workshop Facilitators",
        slug: "facilitators",
        memberCount: 15,
      },
    ],
  },
];


