"use client";

import React from "react";
import {
  User,
  Calendar,
  FileText,
  Users,
  Bookmark,
  Folder,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchItem {
  id: string;
  name: string;
  description?: string;
  date: string;
  category: {
    name: string;
    icon: React.ReactNode;
    slug: string;
  };
  slug: string;
}

const categories = [
  {
    name: "users",
    icon: <User className="w-4 h-4" />,
    slug: "users",
  },
  {
    name: "sessions",
    icon: <Calendar className="w-4 h-4" />,
    slug: "sessions",
  },
  {
    name: "events",
    icon: <Calendar className="w-4 h-4" />,
    slug: "events",
  },
  {
    name: "articles",
    icon: <FileText className="w-4 h-4" />,
    slug: "articles",
  },
  {
    name: "divisions",
    icon: <Users className="w-4 h-4" />,
    slug: "divisions",
  },
  {
    name: "resources",
    icon: <Bookmark className="w-4 h-4" />,
    slug: "resources",
  },
];

const searchData: SearchItem[] = [
  {
    id: "1",
    name: "John Doe Profile",
    description: "Senior developer with 5 years experience",
    date: "2023-10-15",
    category: categories[0],
    slug: "john-doe-profile",
  },
  {
    id: "2",
    name: "Quarterly Planning Session",
    date: "2023-11-20",
    category: categories[1],
    slug: "quarterly-planning",
  },
  {
    id: "3",
    name: "Tech Conference 2023",
    description: "Annual technology conference in San Francisco",
    date: "2023-12-05",
    category: categories[2],
    slug: "tech-conference-2023",
  },
  {
    id: "4",
    name: "React Best Practices",
    date: "2023-09-12",
    category: categories[3],
    slug: "react-best-practices",
  },
  {
    id: "5",
    name: "Engineering Division",
    description: "All members of the engineering division",
    date: "2023-08-30",
    category: categories[4],
    slug: "engineering-division",
  },
  {
    id: "6",
    name: "Design System Resources",
    date: "2023-10-01",
    category: categories[5],
    slug: "design-system-resources",
  },
  {
    id: "7",
    name: "Sarah Johnson Profile",
    description: "UX Designer with specialization in accessibility",
    date: "2023-11-02",
    category: categories[0],
    slug: "sarah-johnson",
  },
  {
    id: "8",
    name: "Product Roadmap Session",
    date: "2023-11-25",
    category: categories[1],
    slug: "product-roadmap-session",
  },
  {
    id: "9",
    name: "Company Hackathon",
    description: "Annual 48-hour hackathon event",
    date: "2024-01-15",
    category: categories[2],
    slug: "company-hackathon",
  },
  {
    id: "10",
    name: "TypeScript Migration Guide",
    date: "2023-10-18",
    category: categories[3],
    slug: "typescript-migration",
  },
  {
    id: "11",
    name: "Marketing Division",
    date: "2023-09-05",
    category: categories[4],
    slug: "marketing-division",
  },
  {
    id: "12",
    name: "Brand Guidelines",
    description: "Official company brand guidelines document",
    date: "2023-08-15",
    category: categories[5],
    slug: "brand-guidelines",
  },
  {
    id: "13",
    name: "Alex Chen Profile",
    date: "2023-12-01",
    category: categories[0],
    slug: "alex-chen",
  },
  {
    id: "14",
    name: "Retrospective Meeting",
    description: "Q3 team retrospective notes",
    date: "2023-10-30",
    category: categories[1],
    slug: "q3-retrospective",
  },
  {
    id: "15",
    name: "New Year Party",
    date: "2023-12-31",
    category: categories[2],
    slug: "new-year-party",
  },
  {
    id: "16",
    name: "Performance Optimization",
    description: "Techniques for React performance optimization",
    date: "2023-11-15",
    category: categories[3],
    slug: "performance-optimization",
  },
  {
    id: "17",
    name: "HR Division",
    date: "2023-09-20",
    category: categories[4],
    slug: "hr-division",
  },
  {
    id: "18",
    name: "Onboarding Materials",
    description: "New employee onboarding resources",
    date: "2023-10-05",
    category: categories[5],
    slug: "onboarding-materials",
  },
  {
    id: "19",
    name: "Maria Garcia Profile",
    date: "2023-11-18",
    category: categories[0],
    slug: "maria-garcia",
  },
  {
    id: "20",
    name: "Budget Planning Session",
    description: "2024 fiscal year budget planning",
    date: "2023-12-10",
    category: categories[1],
    slug: "budget-planning",
  },
];
export default function GlobalSearch() {
  const [currentCategory, setCurrentCategory] = React.useState<string | "all">(
    "all"
  );
  const [isLoading, setIsLoading] = React.useState(false);

  // Simulate loading
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentCategory]);

  const filteredResults =
    currentCategory === "all"
      ? searchData
      : searchData.filter((item) => item.category.slug === currentCategory);

  return (
    <section className="size-full flex flex-col ">
      {/* Category Selection */}

      <div className="p-6 sticky top-0 z-10 bg-primary/[.1] dark:bg-primary/[.05] shadow-sm backdrop-blur-sm rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 relative">
            {currentCategory === "all"
              ? "All Results"
              : `Search Results: ${
                  currentCategory.charAt(0).toUpperCase() +
                  currentCategory.slice(1)
                }`}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500/20 rounded-full"></span>
          </h2>

          {/* Pills on large screens, dropdown on small screens */}
          <div className="sm:hidden">
            <Select onValueChange={setCurrentCategory} value={currentCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pills visible only on sm and above */}
          <div className="hidden sm:flex space-x-3 overflow-x-auto pb-2 px-1 -mx-1">
            <button
              onClick={() => setCurrentCategory("all")}
              className={`relative px-4 py-2 rounded-full text-sm flex items-center space-x-2 whitespace-nowrap transition-all duration-300 ${
                currentCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : " text-gray-700  hover:shadow-md"
              }`}
            >
              <Folder className="w-4 h-4" />
              <span>All</span>
            </button>

            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setCurrentCategory(category.slug)}
                className={`group relative px-4 py-2 rounded-full text-sm flex items-center space-x-2 whitespace-nowrap transition-all duration-300 ${
                  currentCategory === category.slug
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : " text-gray-700 hover:shadow-md"
                }`}
              >
                {React.cloneElement(category.icon, {
                  className: `w-4 h-4 transition-colors ${
                    currentCategory === category.slug
                      ? "text-white"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`,
                })}
                <span>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="grid gap-4">
            {[...Array(5)].map((_, i) => (
              <SearchCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredResults.length === 0 ? (
          <NoResult />
        ) : (
          <div className="grid gap-4">
            {filteredResults.map((item, index) => (
              <SearchCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const SearchCard = ({ item }: { item: SearchItem }) => {
  return (
    <div className="group p-6 rounded-xl bg-gradient-to-br from-primary/[.1] dark:from-primary/[.03] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-[1px] border-primary/[.2] cursor-pointer">
      {/* Glow effect wrapper */}
      <div className="relative ">
        <div className="absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Card content */}
        <div className="relative  ">
          {/* Category header */}
          <div className="flex items-center space-x-2 mb-3">
            {/* <div className="p-2 rounded-lg bg-blue-500/10 text-blue-700 group-hover:bg-blue-500/20 transition-colors">
              {React.cloneElement(item.category.icon, {
                className: "w-4 h-4 text-blue-700",
              })}
            </div> */}
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              {item.category.name}
            </span>
            <span className="text-xs text-gray-500/80 ml-auto font-medium">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title and description */}
          <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-600/90 mt-2.5 line-clamp-2 group-hover:text-gray-700 transition-colors">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchCardSkeleton = () => {
  return (
    <div className="p-5 rounded-xl  shadow-sm border border-primary/[.1]">
      <div className="flex items-center space-x-2 mb-3">
        <Skeleton className="h-6 w-6 rounded-lg" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16 ml-auto" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6 mt-1" />
    </div>
  );
};

const NoResult = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8  rounded-xl border border-gray-200">
      <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        No results found
      </h3>
      <p className="text-gray-500 max-w-md">
        Try a different search term or browse through the categories above
      </p>
    </div>
  );
};
