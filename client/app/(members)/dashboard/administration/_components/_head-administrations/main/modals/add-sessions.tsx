/*   */
"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateEventMutation } from "@/lib/features/api";
import { toast } from "sonner";

const eventValidation = z.object({
  eventTitle: z.string().min(3, { message: "Event title is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  visibility: z.enum(["PUBLIC", "PRIVATE"], {
    required_error: "Visibility is required",
  }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
});

type EventFormType = z.infer<typeof eventValidation>;

const AddEventPopup = () => {
  const [open, setOpen] = useState(false);
  const [createEvent, { isLoading: createEventLoading }] =
    useCreateEventMutation();

  const form = useForm<EventFormType>({
    resolver: zodResolver(eventValidation),
    defaultValues: {
      eventTitle: "",
      description: "",
      location: "",
      visibility: "PUBLIC",
      startTime: "",
      endTime: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<EventFormType> = async (data) => {
    try {
      if (new Date(data.startTime) >= new Date(data.endTime)) {
        toast.error("End time must be after start time");
        return;
      }

      const payload = {
        title: data.eventTitle,
        description: data.description,
        location: data.location,
        visibility: data.visibility,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      };

      await createEvent(payload as any).unwrap();
      toast.success("Event created successfully!");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error((error as any)?.message || "Failed to create event");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
        >
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] p-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-normal text-text1 ">
                Create New Event
              </DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Fill in the details below to schedule your event.
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Title */}
              <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hack The Box" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Lideta Training Center"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        placeholder="A friendly space for juniors to share progress"
                        className="w-full rounded-md border border-gray-300 dark:border-slate-600 px-3 py-2 text-sm shadow-sm bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Visibility */}
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="PUBLIC" id="public" />
                          <label htmlFor="public">Public</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="PRIVATE" id="private" />
                          <label htmlFor="private">Private</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Time */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                type="button"
                variant="outline"
                className=""
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createEventLoading}
              >
                {createEventLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Event"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventPopup;
