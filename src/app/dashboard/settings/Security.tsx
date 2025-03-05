"use client"

import React, {useState} from 'react';
import Header from "./settingComponents/Heading";
import PasswordChangeForm from "./settingComponents/PasswordChanges";
import { useMutation } from "@tanstack/react-query";
import SettingsService from "@/services/setting/index";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userSettingFormSchema, userSettingFormSchemaType } from '@/app/zod-schema/userSettingFormSchema';
import { passwordSchema, passwordSchemaType } from '@/app/zod-schema/securitySettingSchema';


interface PasswordVisibility {
  current_password: boolean;
  new_password: boolean;
  new_password_confirmation: boolean;
}
export default function Security() {

  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<passwordSchemaType>({
    resolver: zodResolver(passwordSchema),
  });

    const [showPassword, setShowPassword] = useState<PasswordVisibility>({
      current_password: false,
      new_password: false,
      new_password_confirmation: false
    });
  
    const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
      setShowPassword(prev => ({
        ...prev,
        [field]: !prev[field]
      }));
    };

    const renderPasswordField = (
      label: string,
      name: keyof PasswordVisibility,
      placeholder: string
    ) => (
      <div className="space-y-2">
        <Label 
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
        <div className="relative">
          <Input
            type={showPassword[name] ? 'text' : 'password'}
            id={name}
            {...register(name)}
            placeholder={placeholder}
            className="pr-10 transition-all duration-200 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
          />
          {errors[name] && (
            <small className="text-red-500">
              {errors[name]?.message}
            </small>
          )}
          <button
            type="button"
            onClick={() => togglePasswordVisibility(name)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword[name] ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    );


  const { mutate, isPending } = useMutation({
    mutationFn: (formData: passwordSchemaType) => SettingsService.updatePasswordChange(formData),
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  const handleFormSubmit: SubmitHandler<passwordSchemaType> = (data) => {
    // const formData = new FormData();
    
    // formData.append('current_password', data.current_password);
    // formData.append('new_password', data.new_password);
    // formData.append('new_password_confirmation', data.new_password_confirmation);

    mutate(data);
  }

  return (


    <section className={`grid gap-4 lg:gap-8`}>
      <Header title="Password" description="Update your account password here."
        handleSave={handleSubmit(handleFormSubmit)} handleCancel={() => { }} isLoading={isPending}
      >
        <div className="w-full  space-y-6 mb-6">
        {renderPasswordField(
        'Current password',
        'current_password',
        '••••••••'
      )}
      <hr className="w-full" />
      {renderPasswordField(
        'New password',
        'new_password',
        '••••••••'
      )}
      {renderPasswordField(
        'Confirm new password',
        'new_password_confirmation',
        '••••••••'
      )}
        </div>
      </Header>
    </section>
  )
}
