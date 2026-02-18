// utils/getSessionStatus.ts
export function getSessionStatus(
  startTime: string | Date,
  endTime: string | Date
): { status: "upcoming" | "ongoing" | "ended"; time: string } {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    const diff = start.getTime() - now.getTime();
    return { status: "upcoming", time: formatDuration(diff) + " left" };
  } else if (now >= start && now <= end) {
    const diff = end.getTime() - now.getTime();
    return { status: "ongoing", time: formatDuration(diff) + " left" };
  } else {
    const diff = now.getTime() - end.getTime();
    return { status: "ended", time: formatDuration(diff) + " ago" };
  }
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);

  return parts.join(" ") || "0m";
}
