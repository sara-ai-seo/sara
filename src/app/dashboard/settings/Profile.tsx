"use client";
import React from "react";
import { countries } from "@/app/component/data/countries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Heading from "./settingComponents/Heading";
import { userSettingFormSchema, userSettingFormSchemaType } from "@/app/zod-schema/userSettingFormSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import SettingsService from "@/services/setting/index";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userSettingFormSchemaType>({
    resolver: zodResolver(userSettingFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.profile.phone || "",
      image: undefined, // No default value for the image
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: userSettingFormSchemaType | FormData) => SettingsService.updateProfile(formData),
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  const onSubmit: SubmitHandler<userSettingFormSchemaType | any> = (data) => {
    const formData = new FormData();
    
    // Ensure field names match exactly what Postman uses
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // if (data.phone) {
    //   formData.append("phone", data.phone);
    // }
    // formData.append("country_code", data.country_code);
    
    // const photoFile = (data.image as unknown as FileList)?.[0];
    // if (photoFile) {
    //   formData.append("image", photoFile); 
    // }

const userData = {
  name: data.name,
  email: data.email,
  phone: data.phone,
  country_code: data.country_code
};

// Add the file to FormData
// const formData = new FormData();
const photoFile = (data.image as unknown as FileList)?.[0];
if (photoFile) {
  formData.append("photo", photoFile);
}

// Append each userData property to formData
Object.entries(userData).forEach(([key, value]) => {
  formData.append(key, value as string);
});

mutate(formData);
    
    // mutate(formData);
  };


  const handleCancel = () => {
    toast.error("Changes cancelled", {
      icon: "❌",
      position: "top-right",
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        // Update the form state for the image
        const fileList = new DataTransfer();
        fileList.items.add(file);
        const input = document.querySelector('input[name="image"]') as HTMLInputElement;
        if (input) {
          input.files = fileList.files;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Watch the image field for changes
  const imageFile = watch("image");

  return (
    <section className="grid gap-4 lg:gap-8 mb-6">
      <Heading
        title="Personal information"
        description="Update your personal information here."
        handleSave={handleSubmit(onSubmit)}
        handleCancel={handleCancel}
        isLoading={isPending}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your name"
                className="transition-all duration-200"
              />
              {errors.name && <small className="text-red-500">{errors.name.message}</small>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="transition-all duration-200"
              />
              {errors.email && <small className="text-red-500">{errors.email.message}</small>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone_number" className="text-sm font-medium text-[#344054]">
                Phone number
              </label>
              <div className="w-full inline-flex items-center">
                <select
                  id="phone_number"
                  {...register("country_code")}
                  className="w-16 border-l border-y rounded-l-md p-[9px] outline-none"
                >
                  {countries.map((country, i) => (
                    <option key={i} value={country.country_iso_code}>
                      {country.country_iso_code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone_number"
                  {...register("phone")}
                  placeholder="Enter your phone number"
                  className="border-y border-r border-gray-300 rounded-r-md p-2 w-full outline-none"
                />
              </div>
              {errors.phone && <small className="text-red-500">{errors.phone.message}</small>}
            </div>

            <div className="space-y-2">
              <Label>Your photo</Label>
              <p className="text-sm text-gray-500">This will be displayed on your profile.</p>
              <div className="mt-2 flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={
                      imageFile?.[0]
                        ? URL.createObjectURL(imageFile[0])
                        : user.profile.avatar || ""
                    }
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 max-w-sm h-24 relative rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center ${
                    false ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Click to upload</div>
                    <div className="text-xs text-gray-500">or drag and drop</div>
                    <div className="text-xs text-gray-500 mt-1">SVG, PNG, or JPG (max. 800x400px)</div>
                  </div>
                  <input
                    type="file"
                    {...register("image")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  {errors.image && <small className="text-red-500">{String(errors.image.message)}</small>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Heading>
    </section>
  );
};