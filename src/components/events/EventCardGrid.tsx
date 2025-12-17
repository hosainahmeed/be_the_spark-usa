import React from "react";
import FeaturedEventsCard from "../landing/Featured Events/FeaturedEventsCard";
import { EventDetails } from "@/types/event";
import { Search, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input, Pagination } from "antd";

export function EventCardGrid({ data, setSearchTerm, page, setPage, searchTerm, setFilters }: { data: any, page: number, setPage: any, searchTerm: string, setSearchTerm: (value: string) => void, setFilters: any }) {
    return (
        <React.Fragment>
            <div className="flex gap-2">
                <Input
                    prefix={<SearchIcon />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className="w-full mb-6 border shadow-none h-12 px-6"
                    placeholder="Search your perfect event" />
                <Button
                    variant="outline"
                    onClick={() => {
                        setFilters({})
                        setSearchTerm('')
                    }}
                    className="border-gray-300"
                >
                    Clear
                </Button>
            </div>
            {data?.data?.meta?.total > 8 && <div className="mb-4">
                <Pagination
                    size="small"
                    align="start"
                    current={page}
                    defaultCurrent={data?.data?.meta?.page}
                    total={data?.data?.meta?.total}
                    pageSize={data?.data?.meta?.limit}
                    onChange={(page) => setPage(page)}
                />
            </div>}
            {data?.data?.result?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.data.result.map((event: EventDetails) => (
                        <FeaturedEventsCard key={event?._id} event={event} />
                    ))}
                </div>
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
                        variant="outline"
                        onClick={() => {
                            setFilters({})
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
