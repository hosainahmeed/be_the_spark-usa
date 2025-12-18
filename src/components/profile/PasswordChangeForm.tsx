import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeFormProps {
  passwordForm: PasswordData;
  onPasswordFormChange: (field: keyof PasswordData, value: string) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  passwordForm,
  onPasswordFormChange,
  onCancel,
  onSubmit
}) => {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <form onSubmit={onSubmit} className='grid grid-cols-1 md:grid-cols-1 gap-4 mb-8'>
      <div className="relative">
        <Label>Old Password</Label>
        <div className="relative">
          <Input
            placeholder="Old Password"
            type={showPassword.oldPassword ? "text" : "password"}
            value={passwordForm.oldPassword}
            onChange={(e) => onPasswordFormChange('oldPassword', e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onPointerDown={() => togglePasswordVisibility('oldPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword.oldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="relative">
        <Label>New Password</Label>
        <div className="relative">
          <Input
            placeholder="New Password"
            type={showPassword.newPassword ? "text" : "password"}
            value={passwordForm.newPassword}
            onChange={(e) => onPasswordFormChange('newPassword', e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onPointerDown={() => togglePasswordVisibility('newPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="relative">
        <Label>Confirm Password</Label>
        <div className="relative">
          <Input
            placeholder="Confirm New Password"
            type={showPassword.confirmPassword ? "text" : "password"}
            value={passwordForm.confirmPassword}
            onChange={(e) => onPasswordFormChange('confirmPassword', e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            onPointerDown={() => togglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          onPointerDown={onCancel}
          className="px-6 py-2.5 bg-white w-fit text-red-600 rounded font-medium border border-red-600 hover:bg-red-50 transition-colors"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className='bg-[var(--blue)] w-fit text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg'
        >
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;