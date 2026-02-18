import Logo from "@/components/Logo";
import NavParent from "@/components/NavParent";
import ThemeToggle from "./ThemeToggle";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex bg-background h-screen overflow-hidden relative">
      <SheetTriggerC />
      <aside className="hidden w-64 h-full bg-background border-r border-gray-200 dark:border-gray-700 lg:flex flex-col px-4 py-6 space-y-8">
        <div className="flex justify-center items-center px-2">
          <Logo />
        </div>

        <nav className="flex-1">
          <NavParent />
        </nav>

        <div className="pb-4">
          <ThemeToggle />
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6">{children}</main>
    </section>
  );
};

const SheetTriggerC = function () {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden absolute top-6 left-6 z-50">
        <Menu className="h-6 w-6 text-foreground" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-background2 flex flex-col justify-between p-6 w-64"
      >
        <div className="space-y-8">
          <div className="flex justify-center items-center">
            <Logo />
          </div>

          <nav>
            <NavParent />
          </nav>
        </div>

        <div className="pb-4">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
