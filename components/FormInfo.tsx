"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { CalendarSelect } from "./ui/calendar-select";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Vui lòng nhập họ và tên của bạn",
    })
    .max(50),
  birthday: z.any(),
});

function FormInfo({
  name,
  birthday,
}: {
  name: string | null;
  birthday: string | null;
}) {
  //const [fullName, setFullName] = useLocalStorage("fullName", "");
  //const [dateOfBirth, setDateOfBirth] = useLocalStorage("birthday", "");
  const [date, setDate] = React.useState<Date>();
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  //const [dateOfBirth, setDateOfBirth] = useState("");

  React.useEffect(() => {
    let localName = localStorage.getItem("fullName") || "";
    let localBirthday = localStorage.getItem("birthday") || "";

    if (localBirthday) {
      try {
        const strDate = localBirthday.split("-");
        const defaultDate: any = Date.parse(
          strDate[2] + "-" + strDate[1] + "-" + strDate[0]
        );
        setDate(defaultDate);
        //setDateOfBirth(localBirthday);
        form.setValue("birthday", defaultDate);
      } catch (e) {
        console.log(e);
      }
    }

    if (localName) {
      setFullName(localName);
      form.setValue("name", localName);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: fullName,
      birthday: date,
    },
  });

  function showToast(values: any) {
    toast({
      title: "Update Value:",
      className: cn(
        "!top-auto right-0 bottom-0 p-5 flex fixed md:max-w-[420px] md:top-4 md:right-4"
      ),
      description: (
        <pre className="mt-2 w-full max-w-[380px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
      duration: 5000,
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    values.birthday = date?.toString() ? format(date, "dd-MM-yyyy") : "";
    showToast(values);
    localStorage.setItem("fullName", values.name);
    localStorage.setItem("birthday", values.birthday);

    setEditMode(!editMode);
    router.replace(
      `/analyze-name?name=${values.name}&birthday=${values.birthday}`
    );
  }

  return (
    <div className="form-info md:sticky top-[64px] py-2 px-5 bg-gray-300 dark:bg-slate-700 shadow-lg z-[10]">
      <div className="form-info m-auto w-full max-w-[400px] md:max-w-5xl flex gap-5">
        {editMode ? (
          <Form {...form}>
            <form
              className="form-info-input w-full flex flex-col 
                md:flex-row gap-4 justify-between"
              method="post"
              action="/analyze-name"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="form-field flex gap-2 items-center min-w-[300px]">
                    <FormLabel className="whitespace-nowrap font-semibold w-1/4">
                      Họ Tên:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="!m-0"
                        placeholder="Họ tên của bạn"
                        {...field}
                        //value={fullName}
                        //defaultValue={fullName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="form-field flex gap-2 items-center min-w-[300px]">
                    <FormLabel className="whitespace-nowrap font-semibold w-1/4">
                      Ngày sinh:
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full !m-0 justify-between text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Chọn ngày sinh</span>
                            )}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <CalendarSelect
                            id="birthday"
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={date}
                            onSelect={setDate}
                            fromYear={1950}
                            toYear={2030}
                            initialFocus
                            className="rounded-md border z-50 w-full bg-white dark:bg-slate-600"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="form-submit flex gap-3">
                <Button type="submit" variant={"default"}>
                  Update
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="form-info w-full flex gap-2 justify-between">
            <div className="form-field flex gap-2 items-center">
              <Label htmlFor="fullName">Họ Tên:</Label>
              <strong>{name}</strong>
            </div>
            <div className="form-field flex gap-2 items-center">
              <Label htmlFor="fullName">Ngày Sinh:</Label>
              <strong>{birthday}</strong>
            </div>
            <div>
              <Button variant={"ghost"} onClick={() => setEditMode(!editMode)}>
                Edit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormInfo;