"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  sector: z.string().nonempty(),
  country: z.string().nonempty(),
  scope1: z.number(),
  scope2: z.number().min(0).max(8).optional(),
  scope3: z.number().min(0).max(8).optional(),
  recordYear: z.string().min(4).max(4).optional(),
  emission_intensity_unit: z.string().optional(),
  emission_intensity: z.number().optional(),
  emission_intensity_derived_by: z.string().optional(),
  Esg: z.any().optional(),
  Childlobour: z.any().optional(),
  childLaborFree: z.boolean().optional().default(false),
  is_msme: z.boolean().optional().default(false),
});
const Edittable = (EditTableDataValue: z.infer<typeof formSchema>) => {
  const Val = EditTableDataValue["EditTableDataValue"];

  const dispatch = useDispatch();
  const [Childlabour, setChildlabour] = useState<any>();
  const [esgFile, setEsgFile] = useState<any>();
  const [childFile, setChildFile] = useState<any>();
  const [Esg, setEsg] = useState<any>();
  const EsghandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Set the image file
    setEsgFile(file);

    if (file) {
      // Create a new FileReader instance
      const reader = new FileReader();

      // Define a function to handle the onload event of the FileReader
      reader.onload = (event) => {
        // Get the binary data from the result of the FileReader
        const binaryData = event.target?.result as ArrayBuffer;

        // Use binaryData as needed, such as sending it to a server or processing it further
        setEsg(binaryData);
      };

      // Read the file as binary data
      reader.readAsArrayBuffer(file);
    }

    // Revoke the previous object URL if it exists
  };
  ///Ecg handle Image
  const ChildhandleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    setChildFile(file);
    // Set the image file

    if (file) {
      // Create a new FileReader instance
      const reader = new FileReader();

      // Define a function to handle the onload event of the FileReader
      reader.onload = (event) => {
        // Get the binary data from the result of the FileReader
        const binaryData = event.target?.result as ArrayBuffer;

        // Use binaryData as needed, such as sending it to a server or processing it further
        setChildlabour(binaryData);
      };

      // Read the file as binary data
      reader.readAsArrayBuffer(file);
    }

    // Revoke the previous object URL if it exists
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: Val.name,
      sector: Val.sector,
      country: Val.country,
      recordYear: Val.recordYear,
      Childlobour: null,
      Esg: null,
      childLaborFree: Val.childLaborFree,
      emission_intensity_derived_by: Val.emission_intensity_derived_by,
      scope1: Val.scope1,
      scope2: Val.scope2,
      scope3: Val.scope3,
      emission_intensity: Val.emission_intensity,
      is_msme: Val.is_msme,
      emission_intensity_unit: Val.emission_intensity_unit,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    delete values["Childlobour"];
    delete values["Esg"];
    console.log(values);
    const PostData = {
      data: values,
      esg_report: Esg || null,
      child_labor_report: Childlabour || null,
      child_labor_File: childFile,
      esg_File: esgFile,
    };

    // dispatch(CreatCarbonAmetionDataAsync(PostData));
  }

  return (
    <>
      <section className="max-w-screen-2xl w-full ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 items-center flex flex-col "
          >
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <FormControl>
                      <Input placeholder={Val.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <FormControl>
                      <Input placeholder={Val.sector} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder={Val.country} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-2">
              {" "}
              <FormField
                control={form.control}
                name="scope1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope 1</FormLabel>
                    <FormControl>
                      <Input placeholder={Val.scope1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scope2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope 2</FormLabel>
                    <FormControl>
                      <Input placeholder={Val.scope2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scope3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scope 3</FormLabel>
                    <FormControl>
                      <Input placeholder={Val.scope3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recordYear"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>Record year </FormLabel>
                    <FormControl>
                      <Input placeholder="recordyear" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center text-xs justify-between">
              {" "}
              <FormField
                control={form.control}
                name="emission_intensity"
                render={({ field }) => (
                  <FormItem className=" flex flex-col ">
                    <FormLabel>Emisson Intesity</FormLabel>
                    <FormControl>
                      <Input
                        className=" "
                        placeholder="Emisson Intesity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emission_intensity_unit"
                render={({ field }) => (
                  <FormItem className=" ">
                    <FormLabel>unit</FormLabel>
                    <FormControl>
                      <Input className="" placeholder="unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emission_intensity_derived_by"
                render={({ field }) => {
                  return (
                    <FormItem className="min-w-52">
                      <FormLabel>Derived by</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Self required ">
                            Self required{" "}
                          </SelectItem>
                          <SelectItem value="Derived">Derived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <FormField
                control={form.control}
                name="Esg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Esg</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        // {...field}
                        name="image"
                        onChange={EsghandleImage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Childlobour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Childlobour</FormLabel>
                    <FormControl>
                      <Input
                        // {...field}
                        type="file"
                        name="image"
                        onChange={ChildhandleImage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-1  mt-5">
                {" "}
                <FormField
                  control={form.control}
                  name="childLaborFree"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Childlobourfree
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_msme"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="msme"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          msme
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button size={"lg"} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default Edittable;
