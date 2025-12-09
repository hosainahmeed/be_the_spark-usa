import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, Spin } from 'antd';
import { getPlaceDetails, getPlaceSuggestions } from '@/lib/getPlaceNameAndCoordinates';

interface ProfileForm {
    businessName: string;
    name: string;
    email: string;
    phone: string;
    location: string;
}

interface ProfileUpdateFormProps {
    profileForm: ProfileForm;
    updatedLoading: boolean;
    onProfileFormChange: (field: keyof ProfileForm, value: string) => void;
    onCancel: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({
    profileForm,
    onProfileFormChange,
    onCancel,
    onSubmit,
    updatedLoading
}) => {

    const [options, setOptions] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value: string) => {
        if (!value) {
            setOptions([]);
            return;
        }

        setLoading(true);

        const results = await getPlaceSuggestions(value);
        setLoading(false);

        setOptions(
            results.map((place: any) => ({
                label: place.name,
                value: place.placeId,
            }))
        );
    };

    const handleSelect = async (placeId: string) => {
        const place = await getPlaceDetails(placeId);
        if (!place) return;
        onProfileFormChange('location', place?.name || '');
    };
    return (
        <form onSubmit={onSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
            <div>
                <Label>Business Name</Label>
                <Input
                    value={profileForm.businessName}
                    onChange={(e) => onProfileFormChange('businessName', e.target.value)}
                />
            </div>
            <div>
                <Label>Name</Label>
                <Input
                    value={profileForm.name}
                    onChange={(e) => onProfileFormChange('name', e.target.value)}
                />
            </div>
            <div>
                <Label>Phone Number</Label>
                <Input
                    value={profileForm.phone}
                    onChange={(e) => onProfileFormChange('phone', e.target.value)}
                />
            </div>
            <div>
                <Label>Location</Label>
                <Select
                    size="large"
                    showSearch
                    placeholder="Search a location"
                    style={{ width: "100%", height: 48 }}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    filterOption={false}
                    notFoundContent={loading ? <Spin size="small" /> : null}
                    value={profileForm.location || undefined}
                    options={options}
                />
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
                    {updatedLoading ? 'Updating Profile...' : 'Update Profile'}
                </Button>
            </div>
        </form>
    );
};

export default ProfileUpdateForm;