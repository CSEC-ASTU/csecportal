import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change: string | number;
  date: string;
  isNegative?: boolean;
}

export function StatCard({
  icon:Icon,
  label,
  value,
  change,
  date,
  isNegative = false,
}: StatCardProps) {
  return (
    <Card className="bg-card text-card-foreground shadow-md rounded-lg">
      <CardContent className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="bg-muted rounded-lg p-2">
            <Icon className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-foreground text-sm font-medium">{label}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-primary">{value}</p>
          <Badge variant={isNegative ? "red" : "green"}>
            <Triangle
              className={cn("h-4 w-4", isNegative && "rotate-180")}
              fill={isNegative ? "#F45B69" : "#28A745"}
            />
            <p>{change}</p>
          </Badge>
        </div>
      </CardContent>
      <CardContent className="border-t-2 border-muted">
        <p className="text-xs text-muted-foreground">Update: {date}</p>
      </CardContent>
    </Card>
  );
}
