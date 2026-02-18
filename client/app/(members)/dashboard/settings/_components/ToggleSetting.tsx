import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSettingProps {
  label: string;
  description: string;
  defaultChecked?: boolean;
}

export function ToggleSetting({
  label,
  description,
  defaultChecked = false,
}: ToggleSettingProps) {
  return (
    <div className="flex justify-between items-center border-b-1 pb-4">
      <div className="space-y-2 ">
        <Label className="font-semibold">{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
