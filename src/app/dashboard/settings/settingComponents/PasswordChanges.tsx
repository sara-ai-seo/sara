"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordVisibility {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

const PasswordChangeForm = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
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
          name={name}
          value={passwords[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="pr-10 transition-all duration-200 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
        />
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

  return (
    <form className="w-full  space-y-6 mb-6">
      {renderPasswordField(
        'Current password',
        'current',
        '••••••••'
      )}
      <hr className="w-full" />
      {renderPasswordField(
        'New password',
        'new',
        '••••••••'
      )}
      {renderPasswordField(
        'Confirm new password',
        'confirm',
        '••••••••'
      )}
    </form>
  );
};

export default PasswordChangeForm;