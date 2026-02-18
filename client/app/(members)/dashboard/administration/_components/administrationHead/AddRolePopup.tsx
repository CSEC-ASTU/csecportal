"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const roleValidation = z.object({
  roleName: z.string().min(1, { message: "Role name is required" }),
  permissions: z
    .array(z.string())
    .min(1, { message: "At least one permission is required" }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

type RoleFormType = z.infer<typeof roleValidation>;

const permissions = [
  { value: "all", label: "All" },
  { value: "upload-resources", label: "Upload Resources" },
  { value: "create-division", label: "Create A Division" },
  { value: "schedule-sessions", label: "Schedule Sessions" },
  { value: "mark-attendance", label: "Mark Attendance" },
];

export default function AddRolePopup() {
  const form = useForm<RoleFormType>({
    resolver: zodResolver(roleValidation),
    defaultValues: {
      roleName: "",
      permissions: [],
      status: "active",
    },
    mode: "onBlur",
  });

  const togglePermission = (value: string) => {
    const currentPermissions = form.getValues("permissions");
    if (currentPermissions.includes(value)) {
      form.setValue(
        "permissions",
        currentPermissions.filter((permission) => permission !== value)
      );
    } else {
      form.setValue("permissions", [...currentPermissions, value]);
    }
  };

  const onSubmit = async (data: RoleFormType) => {
    console.log("Form submitted:", data);
  };

  return (
    <DialogContent className="w-[380px] p-6 bg-background rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">
              Add New Role
            </DialogTitle>
          </DialogHeader>

          <FormField
            control={form.control}
            name="roleName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Role Name"
                    {...field}
                    className="py-3 px-4 border border-muted-background rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permissions"
            render={() => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {form.getValues("permissions").length > 0
                          ? `${form.getValues("permissions").length} selected`
                          : "Add Permission"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2">
                      <div className="flex flex-col space-y-2">
                        {permissions.map((permission) => (
                          <label
                            key={permission.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={form
                                .getValues("permissions")
                                .includes(permission.value)}
                              onCheckedChange={() =>
                                togglePermission(permission.value)
                              }
                            />
                            <span className="text-sm text-foreground">
                              {permission.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <label htmlFor="status" className="text-sm font-medium">
                  Select Status
                </label>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex items-center space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <label
                        htmlFor="active"
                        className="text-sm font-medium text-foreground"
                      >
                        Active
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <label
                        htmlFor="inactive"
                        className="text-sm font-medium text-foreground"
                      >
                        Inactive
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3 items-center mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="py-2 px-4 text-foreground border border-muted-background rounded-md hover:bg-muted-background"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary-dark"
            >
              Add Role
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
