import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDeleteProfileMutation } from '@/app/redux/service/profileApis';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface ActionButtonsProps {
  onUpdateProfile: () => void;
  onChangePassword: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onUpdateProfile,
  onChangePassword,
}) => {
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteProfileMutation();
  const [password, setPassword] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInitialDeleteClick = () => {
    setShowPasswordDialog(true);
    setError(null);
    setPassword('');
  };

  const handleConfirmDelete = async () => {
    if (!password.trim()) {
      setError('Please enter your password to confirm deletion.');
      return;
    }

    try {
      const payload = {
        password: password.trim()
      };

      const res = await deleteAccount(payload).unwrap();
      if (!res?.success) {
        throw new Error(res?.message)
      }
      toast.success(res?.message)

      Cookies.remove("accessTokenForPlayFinder")
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to delete account. Please try again.');
    }
  };

  const handleClosePasswordDialog = () => {
    setShowPasswordDialog(false);
    setPassword('');
    setError(null);
  };

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

      {/* Warning Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-red-600 bg-transparent border border-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleInitialDeleteClick}
          >
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <DialogTitle>Permanently Delete Your Account</DialogTitle>
            </div>
            <DialogDescription className="text-left pt-2">
              This action <span className="font-semibold">cannot be reversed</span>. All your stored data, profile information, and history will be immediately and permanently erased.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                By confirming, you understand that you will lose access to the account and that we cannot recover any of your data later.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Enter your password to confirm deletion:
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your password"
                className="w-full"
                disabled={isDeleting}
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClosePasswordDialog}
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              size="sm"
              onClick={handleConfirmDelete}
              disabled={isDeleting || !password.trim()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 1 font-semibold text-sm md:text-base transition-colors duration-200"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Confirm Delete Account'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;