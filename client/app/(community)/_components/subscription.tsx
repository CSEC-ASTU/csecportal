import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Subscription() {
  return (
    <div className="w-full flex flex-col lg:flex-row py-8 items-center justify-center lg:py-16 bg-primary/[.1] dark:bg-primary/[.05] text-gray-5 gap-5">
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl lg:text-3xl font-bold tracking-[1px] text-primary">
          Subscribe To Our Notification Reminders
        </p>
      </div>

      <form className="w-[70%] lg:w-[60%] 2xl:w-[40%] h-14  relative">
        <Input
          type="text"
          placeholder="Your Email Address"
          className="w-full h-full outline-none border-[1px] placeholder:text-gray-800 border-secondary rounded-4 bg-gray-50 dark:bg-gray-200 pl-8 pr-10 rounded-lg"
        />

        <Button className="h-full text-white absolute top-[50%] -translate-y-[50%] right-0">
          <span>Subscribe</span>
        </Button>
      </form>
    </div>
  );
}
