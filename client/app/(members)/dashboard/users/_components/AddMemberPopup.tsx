/*   */
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllDivisionsQuery,
  useAddMemberMutation,
  useGetGroupsByDivisionQuery,
} from "@/lib/features/api";
import { Loader2, PlusCircle, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

const newMemberValidation = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Please enter at least first and last name",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignupFormType = z.infer<typeof newMemberValidation>;

export default function AddNewMembers() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // API Calls
  const {
    data: divisionData,
    isLoading: isDivisionsLoading,
    isError: isDivisionsError,
  } = useGetAllDivisionsQuery();

  const {
    data: groupData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useGetGroupsByDivisionQuery(selectedDivision?.id || "", {
    skip: !selectedDivision?.id,
  });

  const [addMember, { isLoading: isAdding }] = useAddMemberMutation();

  const form = useForm<SignupFormType>({
    resolver: zodResolver(newMemberValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(-10);
    form.setValue("password", randomPassword, { shouldValidate: true });
    toast.success("Password generated");
  };

  const onSubmit = async (formData: SignupFormType) => {
    try {
      if (!selectedDivision?.id || !selectedGroup?.id) {
        toast.error("Please select both division and group");
        return;
      }

      const [freeName, ...lastParts] = formData.fullName.trim().split(" ");
      const lastName = lastParts.join(" ");

      const payload = {
        email: formData.email,
        password: formData.password,
        freeName,
        lastName,
        divisionId: selectedDivision.id,
        groupId: selectedGroup.id,
      };

      await addMember(payload).unwrap();

      toast.success("Member added successfully");
      form.reset();
      setSelectedDivision(null);
      setSelectedGroup(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member");
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-xl"
      >
        <span className="relative z-10 flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          <span>Add New Member</span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="relative p-6">
              <button
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <PlusCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Add New Member
                </h2>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="space-y-4">
                    <div>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Division
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = divisionData?.data?.find(
                            (d: any) => d.id === value
                          );
                          if (selected) {
                            setSelectedDivision({
                              id: selected.id,
                              name: selected.name,
                            });
                            setSelectedGroup(null);
                          }
                        }}
                        value={selectedDivision?.id || ""}
                        disabled={isDivisionsLoading || isDivisionsError}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue
                            placeholder={
                              isDivisionsLoading
                                ? "Loading divisions..."
                                : "Select Division"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {divisionData?.data?.map((d: any) => (
                            <SelectItem key={d.id} value={d.id}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isDivisionsError && (
                        <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                          Failed to load divisions
                        </p>
                      )}
                    </div>

                    <div>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Group
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selected = groupData?.data?.find(
                            (g: any) => g.id === value
                          );
                          if (selected) {
                            setSelectedGroup({
                              id: selected.id,
                              name: selected.name,
                            });
                          }
                        }}
                        value={selectedGroup?.id || ""}
                        disabled={
                          !selectedDivision || isGroupsLoading || isGroupsError
                        }
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue
                            placeholder={
                              !selectedDivision
                                ? "Select division first"
                                : isGroupsLoading
                                ? "Loading groups..."
                                : "Select Group"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {groupData?.data?.map((g: any) => (
                            <SelectItem key={g.id} value={g.id}>
                              {g.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isGroupsError && (
                        <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                          Failed to load groups
                        </p>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Password
                      </FormLabel>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generatePassword}
                          className="shrink-0 h-11 gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          Generate
                        </Button>
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Secure password"
                                  {...field}
                                  className="h-11"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsOpen(false);
                        form.reset();
                      }}
                      disabled={isAdding}
                      className="h-11"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isAdding}
                      className="h-11 bg-blue-600 hover:bg-blue-700"
                    >
                      {isAdding ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        "Invite Member"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
