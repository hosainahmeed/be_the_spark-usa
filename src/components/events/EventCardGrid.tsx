import React from "react";
import FeaturedEventsCard from "../landing/Featured Events/FeaturedEventsCard";
import { EventDetails } from "@/types/event";
import { Search, SearchIcon } from "lucide-react";
import { Button, Input, Pagination } from "antd";
import { FiFilter } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateEventData } from "@/app/redux/slices/eventSlice";

export function EventCardGrid({ data, setSearchTerm, setDistance, setLatitude, setLongitude, page, setShowMobileFilter, setPage, searchTerm, setFilters }: { setDistance?: any, setLatitude?: any, setLongitude?: any, setShowMobileFilter: any, data: any, page: number, setPage: any, searchTerm: string, setSearchTerm: (value: string) => void, setFilters: any }) {
    const dispatch = useDispatch()
    return (
        <React.Fragment>
            <div className="flex gap-2">
                <div className="lg:hidden mb-4">
                    <Button
                        icon={<FiFilter />}
                        onPointerDown={() => setShowMobileFilter(true)}
                        className="flex items-center gap-2 !h-11"
                        size="large"
                    />
                </div>
                <Input
                    prefix={<SearchIcon />}
                    onChange={(e) => {
                        setPage(1)
                        setSearchTerm(e.target.value)
                    }}
                    value={searchTerm}
                    size="middle"
                    className="w-full mb-6 border shadow-none h-11 px-6"
                    placeholder="Search your perfect event" />
                <Button
                    size="large"
                    onPointerDown={() => {
                        setFilters({})
                        setSearchTerm('')
                        if (setDistance) setDistance('')
                        if (setLatitude) setLatitude('')
                        if (setLongitude) setLongitude('')
                        dispatch(updateEventData({ field: 'address', value: '' }))
                    }}
                    className="border-gray-300 !h-11"
                >
                    Clear
                </Button>
            </div>
            {data?.data?.result?.length > 0 ? (
                <>
                    {data?.data?.meta?.total > 8 && <div className="mb-4">
                        <Pagination
                            size="default"
                            align="start"
                            current={page}
                            defaultCurrent={data?.data?.meta?.page}
                            total={data?.data?.meta?.total}
                            pageSize={data?.data?.meta?.limit}
                            onChange={(page) => setPage(page)}
                        />
                    </div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {data.data.result.map((event: EventDetails) => (
                            <FeaturedEventsCard key={event?._id} event={event} />
                        ))}
                    </div>
                    {data?.data?.meta?.total > 8 && <div className="mt-4 md:hidden block">
                        <Pagination
                            size="default"
                            align="start"
                            current={page}
                            defaultCurrent={data?.data?.meta?.page}
                            total={data?.data?.meta?.total}
                            pageSize={data?.data?.meta?.limit}
                            onChange={(page) => setPage(page)}
                        />
                    </div>}
                </>

            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="bg-gray-100 p-6 rounded-full mb-6">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
                    <p className="text-gray-500 mb-6 max-w-md">
                        We couldn't find any events matching your search. Try adjusting your filters or check back later for new events.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        onPointerDown={() => {
                            setFilters({})
                            if (setDistance) setDistance('')
                            if (setLatitude) setLatitude('')
                            if (setLongitude) setLongitude('')
                        }}
                        className="border-gray-300"
                    >
                        Clear search
                    </Button>
                </div>
            )}
        </React.Fragment>
    )
}
