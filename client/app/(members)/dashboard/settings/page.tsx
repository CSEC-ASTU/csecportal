import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "./_components/ThemeSwitcher";
import { Label } from "@/components/ui/label";
import { ToggleSetting } from "./_components/ToggleSetting";

export default function SettingsPage() {
  return (
    <div className=" space-y-6">
      <Card className="p-6 min-h-[560px]">
        <CardContent className="space-y-8 p-0">
          {/* Theme Switch */}
          <div className="flex justify-between items-center border-b-1 pb-4">
            <div className="max-w-md space-y-1">
              <Label className="font-semibold">Appearance</Label>
              <p className="text-sm text-muted-foreground">
                Customize how your theme looks on your device
              </p>
            </div>
            <ThemeSwitcher />
          </div>
          <ToggleSetting
            label="Automatically Add Events to Calendar"
            description="Save time by auto-adding events to your calendar, or manually enter them for more control."
            defaultChecked
          />
          <ToggleSetting
            label="Make your Phone Public"
            description="Keep your phone private for safety, or share it for convenience."
            defaultChecked
          />
        </CardContent>
      </Card>
    </div>
  );
}
