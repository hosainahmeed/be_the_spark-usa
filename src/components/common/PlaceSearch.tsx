import React, { memo, useState } from "react";
import { Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceSuggestions, getPlaceDetails } from "@/lib/getPlaceNameAndCoordinates";
import { setLocation, setLocationCoordinates, updateEventData } from "@/app/redux/slices/eventSlice";


const PlaceSearch = ({ existingPlace, isTitle = true, setLongitude, setLatitude }: { setLongitude?: any, setLatitude?: any, existingPlace?: string, isTitle?: boolean }) => {
    const dispatch = useDispatch();
    const eventData = useSelector((state: any) => state.event);
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

        // for browse-events
        if (setLongitude && setLatitude) {
            setLongitude(place.longitude)
            setLatitude(place.latitude)
        };

        // for event
        dispatch(setLocationCoordinates([place.longitude, place.latitude]))
        dispatch(
            setLocation({
                type: "Point",
                coordinates: [place.longitude, place.latitude],
            })
        );
        dispatch(updateEventData({ field: 'address', value: place?.name }))
    };

    return (
        <div>
            {isTitle && <label className="font-semibold">Select Location</label>}
            <Select
                size="large"
                defaultValue={existingPlace || null}
                showSearch
                placeholder="Search a place"
                style={{ width: "100%" }}
                onSearch={handleSearch}
                onSelect={handleSelect}
                allowClear
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : null}
                value={eventData.address || undefined}
                options={options}
            />
        </div>
    );
};

export default memo(PlaceSearch);
