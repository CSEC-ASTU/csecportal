import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useGetAllEventsQuery } from "@/lib/features/api";
import Link from "next/link";

export const UpcomingEvent = () => {
  const { data, isLoading } = useGetAllEventsQuery({ limit: 1, page: 1, sort: "desc" });
  const event = data?.data?.[0];

  if (isLoading) return <div className="h-48 w-full bg-muted animate-pulse rounded-xl" />;
  if (!event) return null;

  return (
    <div className="group relative border rounded-xs  overflow-hidden bg-background flex flex-col md:flex-row transition-colors border-primary/5 hover:border-primary/10">
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase">
              {event.status}
            </span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              {new Date(event.date).toLocaleDateString()}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
            {event.description}
          </p>
        </div>

        <Link
          href="/dashboard/sessions-events"
          className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
        >
          Learn More <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="relative w-full md:w-72 h-48 md:h-auto bg-muted">
        <Image
          src="/why/why1.jpg"
          alt={event.title}
          fill
          className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all"
        />
      </div>
    </div>
  );
};
