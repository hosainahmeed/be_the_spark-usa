import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  return (
    <form onSubmit={onSubmit} className='grid grid-cols-1 md:grid-cols-1 gap-4 mb-8'>
      <div>
        <Label>Old Password</Label>
        <Input
          placeholder="Old Password"
          type="password"
          value={passwordForm.oldPassword}
          onChange={(e) => onPasswordFormChange('oldPassword', e.target.value)}
        />
      </div>
      <div>
        <Label>New Password</Label>
        <Input
          placeholder="New Password"
          type="password"
          value={passwordForm.newPassword}
          onChange={(e) => onPasswordFormChange('newPassword', e.target.value)}
        />
      </div>
      <div>
        <Label>Confirm Password</Label>
        <Input
          placeholder="Confirm New Password"
          type="password"
          value={passwordForm.confirmPassword}
          onChange={(e) => onPasswordFormChange('confirmPassword', e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={onCancel}
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