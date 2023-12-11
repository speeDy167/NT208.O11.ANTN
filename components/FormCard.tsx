"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon, SearchIcon } from "lucide-react";
//import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarSelect } from "./ui/calendar-select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Vui lòng nhập họ và tên của bạn!",
    })
    .max(50),
  birthday: z.any(),
});

function FormCard() {
  const router = useRouter();
  const { toast } = useToast();

  const [defaultName, setDefaultName] = React.useState("");
  const [defaultBirthday, setDefaultBirthday] = React.useState("");
  const [date, setDate] = React.useState<Date>();

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
        form.setValue("birthday", defaultDate);
      } catch (e) {
        console.log(e);
      }
    }

    if (localName) {
      setDefaultName(localName);
      form.setValue("name", localName);
    }
  }, [defaultName, defaultBirthday]);

  // function showToast(values: any) {
  //   toast({
  //     title: "You submitted the following values:",
  //     className: cn(
  //       "!top-auto right-0 bottom-0 p-5 flex fixed md:max-w-[420px] md:top-4 md:right-4"
  //     ),
  //     description: (
  //       <pre className="mt-2 w-full max-w-[380px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     ),
  //     duration: 5000,
  //   });
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
      birthday: date,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    values.birthday = date?.toString() ? format(date, "dd-MM-yyyy") : "";
    //showToast(values);
    localStorage.setItem("fullName", values.name);
    localStorage.setItem("birthday", values.birthday);

    router.push(
      `/analyze-name?name=${values.name}&birthday=${values.birthday}`
    );
  }

  return (
    <Card className="w-full max-w-[420px] m-auto">
      <Form {...form}>
        <form
          className="form-input"
          method="post"
          action="/analyze-name"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CardHeader className="border-b mb-5 text-center">
            <CardTitle>Tra Cứu Thần Số Học</CardTitle>
            <CardDescription>
              Tra cứu thần số học theo tên và ngày sinh của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="form-field flex flex-col gap-1 mb-5">
                  <FormLabel>Họ và Tên:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Họ tên của bạn"
                      {...field}
                      //value={fullName}
                      //defaultValue={fullName}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="form-field flex flex-col space-y-2">
                  <FormLabel>Ngày sinh:</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-between text-left font-normal",
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
                          toYear={2023}
                          initialFocus
                          className="rounded-md border z-50 w-full bg-white dark:bg-slate-600"
                          
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-5">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button type="submit" className="w-full flex justify-center gap-2">
              Tra cứu
              <SearchIcon size="20" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default FormCard;
