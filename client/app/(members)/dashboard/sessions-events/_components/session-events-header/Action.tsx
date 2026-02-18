/*   */
"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectDropdown } from "@/components/SelectDropDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateSessionMutation,
  useGetAllDivisionsQuery,
} from "@/lib/features/api";

const sessionValidation = z.object({
  sessionName: z.string().min(3, { message: "Session name is required" }),
  startMonth: z.date({ required_error: "Start month is required" }),
  endMonth: z.date({ required_error: "End month is required" }),
  day: z.string().min(1, { message: "Day is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  division: z.string().min(1, { message: "Division is required" }),
  group: z.string().min(1, { message: "Group is required" }),
});

type SessionFormType = z.infer<typeof sessionValidation>;

const daysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const AddSessionPopup = function () {
  const [division, setDivision] = React.useState<string>("");
  const [isStartMonthPopoverOpen, setIsStartMonthPopoverOpen] =
    React.useState(false);
  const [isEndMonthPopoverOpen, setIsEndMonthPopoverOpen] =
    React.useState(false);

  const { data: divisions = [] } = useGetAllDivisionsQuery();
  const [createSession] = useCreateSessionMutation();

  const form = useForm<SessionFormType>({
    resolver: zodResolver(sessionValidation),
    defaultValues: {
      sessionName: "",
      startMonth: undefined,
      endMonth: undefined,
      day: "",
      startTime: "",
      endTime: "",
      division: "",
      group: "default-group",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SessionFormType) => {
    const selectedDivision = divisions?.find(
      (d: any) => d.slug === data.division
    );

    if (!selectedDivision) {
      console.error("Division not found");
      return;
    }

    const startTimeISO = new Date(
      `${data.day} ${data.startTime}`
    ).toISOString();
    const endTimeISO = new Date(`${data.day} ${data.endTime}`).toISOString();

    const payload = {
      title: data.sessionName,
      description: `Session for ${data.group}`,
      startTime: startTimeISO,
      endTime: endTimeISO,
      location: "Main Conference Room A",
      divisionId: selectedDivision.id,
      userIds: ["681ddc9c2af51c9fcb99e21a"],
    };

    try {
      await createSession(payload as any).unwrap();
      form.reset();
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  return (
    <DialogContent className="max-w-[600px] lg:max-w-[700px] p-6 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground border-b border-muted-background pb-4">
              Add New Session
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sessionName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Session Title"
                      {...field}
                      className="py-3 px-4 border border-muted-background rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectDropdown
              label="Session Division"
              options={
                divisions &&
                divisions.map((d: any) => ({
                  value: d.slug,
                  label: d.name,
                }))
              }
              selectedValue={division}
              onChange={(val) => {
                setDivision(val);
                form.setValue("division", val);
              }}
            />

            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Group"
                      className="py-3 px-4 border border-muted-background rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <Popover
                      open={isStartMonthPopoverOpen}
                      onOpenChange={setIsStartMonthPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value
                              ? format(field.value, "MMMM")
                              : "Start Month"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endMonth"
                render={({ field }) => (
                  <FormItem>
                    <Popover
                      open={isEndMonthPopoverOpen}
                      onOpenChange={setIsEndMonthPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value
                              ? format(field.value, "MMMM")
                              : "End Month"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Start Time (e.g. 10:00)"
                      className="py-3 px-4 border border-muted-background rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="End Time (e.g. 12:00)"
                      className="py-3 px-4 border border-muted-background rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="py-2 px-4 text-foreground border border-muted-background hover:bg-muted-background"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddSessionPopup;
