"use client"
import React from 'react'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import  toast  from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "./settingComponents/Heading";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  photo: string;
}

export const Profile = () => {
  const [info, setInfo] = useState<PersonalInfo>({
    name: "John Smith",
    email: "johnsmith@gmail.com",
    phone: "212 456 7890",
    photo: "",
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast.success("Changes saved successfully", {
      icon: "��",
      position: "top-right",
    });
  };

  const handleCancel = () => {
    toast.error ("Changes cancelled", {
      icon: "❌",
      position: "top-right",
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setInfo((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className={`grid gap-4 lg:gap-8 mb-6`}>
    <Heading title="Personal information" description="Update your personal information here." handleSave={handleSubmit} />
    <div className="transition-all duration-200 border-0 p-0">
      {/* <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Personal Info</CardTitle>
        <p className="text-sm text-gray-500">Update your photo and personal details here.</p>
      </CardHeader> */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={info.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={info.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                +1
              </span>
              <Input
                id="phone"
                value={info.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="rounded-l-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your photo</Label>
            <p className="text-sm text-gray-500">This will be displayed on your profile.</p>
            <div className="mt-2 flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={info.photo} />
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {info.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex-1 max-w-sm h-24 relative rounded-lg border-2 border-dashed transition-all duration-200 flex items-center justify-center
                  ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
                onDragOver={handleDrag}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600">Click to upload</div>
                  <div className="text-xs text-gray-500">or drag and drop</div>
                  <div className="text-xs text-gray-500 mt-1">SVG, PNG, or JPG (max. 800x400px)</div>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setInfo((prev) => ({ ...prev, photo: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
    </section>
    
  );
};
