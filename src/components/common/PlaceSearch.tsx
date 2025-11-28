import React, { memo, useState } from "react";
import { Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceSuggestions, getPlaceDetails } from "@/lib/getPlaceNameAndCoordinates";


const PlaceSearch = () => {
    const dispatch = useDispatch();
    const parentDetails = useSelector((state: any) => state.applyIgnite.parentDetails);

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

        // dispatch(
        //     setParentDetails({
        //         guardianAddress: place.name,
        //         location: {
        //             type: "Point",
        //             coordinates: [place.longitude, place.latitude],
        //         },
        //     })
        // );
    };

    return (
        <div>
            <label className="font-semibold">Search Address</label>
            <Select
                size="large"
                showSearch
                placeholder="Search a place"
                style={{ width: "100%" }}
                onSearch={handleSearch}
                onSelect={handleSelect}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : null}
                value={parentDetails.guardianAddress || undefined}
                options={options}
            />
        </div>
    );
};

export default memo(PlaceSearch);
