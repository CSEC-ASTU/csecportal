import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";

interface StatusCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change: string | number;
  date: string;
  isNegative?: boolean;
}

export function StatusCard({
  icon: Icon,
  label,
  value,
  change,
  date,
  isNegative = false,
}: StatusCardProps) {
  return (
    <div className="border rounded-xl p-5 bg-background hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isNegative ? "text-red-500" : "text-emerald-500"}`}>
          {isNegative ? <ArrowDown className="size-3" /> : <ArrowUp className="size-3" />}
          {change}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold">{value}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-dashed">
        <p className="text-[10px] text-muted-foreground italic text-right">
          Last updated {date}
        </p>
      </div>
    </div>
  );
}
