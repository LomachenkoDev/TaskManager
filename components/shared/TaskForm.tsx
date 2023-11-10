"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import { formSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createTask } from "@/lib/actions/task.action";
interface Props {
  size: number;
}
const TaskForm = ({ size }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
      title: "",
      status: "pending",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    try {
      await createTask({
        title: values.title,
        status: values.status,
        details: values.details,
        taskId: `Task${size + 1}`,
        path: pathname,
      });
      toast({
        title: "You submitted the following values",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
      console.log(isSubmitting);
    } catch (error) {
      throw error;
    } finally {
      form.reset();
      await setTimeout(() => setIsSubmitting(false), 2000);
    }
  }
  return (
    <>
      <h4 className=" text-[2.5rem] mb-2 text-center text-golden-100 my-10 font-montser font-black">
        {" "}
        Daily Task Creator
      </h4>

      <div className="flex flex-row mt-7 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4  flex-1 bg-black p-8 items-start "
          >
            <span className="text-light-400 self-start font-inter font-extrabold ml-60 max-sm:ml-14">
              TASKS
            </span>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row items-center gap-2">
                  <FormLabel className="font-bold text-lg text-white font-inter ">
                    Title
                  </FormLabel>
                  <FormControl className="no-focus rounded-full font-bold bg-white ml-7 min-h-[40px] max-w-[400px] shadow-sm shadow-white">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem className=" flex-row flex  items-center gap-4 w-full">
                  <FormLabel className="font-bold text-lg text-white mt-2 font-inter ">
                    Details
                  </FormLabel>
                  <FormControl className="no-focus  font-bold bg-white rounded-full ml-1 min-h-[40px] max-w-[400px] shadow-sm shadow-white">
                    <Input className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row gap-2 items-center">
                  <FormLabel className="font-bold text-lg text-white mt-2 font-inter">
                    Status
                  </FormLabel>
                  <FormControl className="rounded-full font-bold bg-white">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className=" ml-4 px-4 text-center font-bold text-md bg-white rounded-full min-h-[40px] max-w-[150px] font-inter ">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-400 border-none">
                        <SelectItem
                          value="pending"
                          className="text-light-700 font-montser font-bold text-[20px]"
                        >
                          Pending
                        </SelectItem>
                        <SelectItem
                          value="completed"
                          className="text-light-700 font-montser font-bold text-[20px]"
                        >
                          Completed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-start mt-6">
              <Button
                type="submit"
                className="bg-white rounded w-fit text-dark-500 hover:bg-slate-500 font-semibold font-inter"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span>Submitting</span> : <span>Submit</span>}
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex flex-1 w-full relative">
          <Image
            src="/assets/images/task.jpg"
            fill={true}
            alt="background image"
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </>
  );
};
export default TaskForm;
