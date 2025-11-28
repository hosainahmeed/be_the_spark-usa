import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ActionButtonsProps {
  onUpdateProfile: () => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onUpdateProfile,
  onChangePassword,
  onDeleteAccount
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={onUpdateProfile}
        className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Update Profile
      </Button>
      <Button
        onClick={onChangePassword}
        className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Change Password
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-red-600 bg-transparent border border-red-600 hover:text-red-600">
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permanently Delete Your Account</DialogTitle>
            <DialogDescription>
              This action cannot be reversed. All your stored data, profile information, and history will be immediately and permanently erased. By confirming, you understand that you will lose access to the account and that we cannot recover any of your data later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm" variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              size="sm"
              onClick={onDeleteAccount}
              className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)] text-white px-6 py-3 md:px-8 md:py-4 rounded font-semibold text-sm md:text-base transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;