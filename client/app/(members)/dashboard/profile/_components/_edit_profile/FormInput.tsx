/*   */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface IFormInput {
  placeholder: string;
  type: string;
  is_full: boolean;
  name: string;
  form: any;
}

export default function FormInput(data: IFormInput) {
  if (data.type === "select ") {
    return <div>Hello</div>;
  }

  if (data.type === "textarea") {
    return (
      <FormField
        control={data.form.control || ""}
        name={data.name}
        render={({ field }) => (
          <FormItem className={`${data.is_full ? "w-full" : "w-[49%]"} h-56`}>
            <FormControl className="size-full">
              <Textarea
                className="size-full py-6 resize-none"
                placeholder={data.placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (data.type === "image") {
    return (
      <div className="w-full flex gap-2 items-center">
        <FormField
          control={data.form.control || ""}
          name={data.name}
          render={({ field }) => (
            <FormItem className={`${data.is_full ? "w-full" : "w-[49%]"}`}>
              <FormControl>
                <div
                  className="relative size-34 lg:size-42  rounded-xl overflow-hidden border border-dashed 
                 bg-[#121212]/[.1] hover:bg-[#121212]/[.2] transition-all duration-300"
                >
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // Pass FileList to react-hook-form so callers can detect files
                      field.onChange(e.target.files);
                    }}
                  />

                  <div className="absolute inset-0 bg-[url('/your-placeholder.jpg')] bg-cover bg-center opacity-30 pointer-events-none rounded-xl"></div>

                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600 pointer-events-none">
                    <Camera />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  return (
    <FormField
      control={data.form.control || ""}
      name={data.name}
      render={({ field }) => (
        <FormItem className={`${data.is_full ? "w-full" : "w-[49%]"}`}>
          <FormControl className="w-full">
            <Input
              type={data.type}
              className="w-full py-6"
              placeholder={data.placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
