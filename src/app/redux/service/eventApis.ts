import baseApis from "../baseApis";


const eventApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: (params) => ({
                url: '/event/get-all',
                method: 'GET',
                params
            }),
            providesTags: ['event']
        }),
        getSingleEvent: builder.query({
            query: (id: string) => ({
                url: `/event/get-single/${id}`,
                method: 'GET',
            }),
            providesTags: ['event']
        }),
        deleteEvent: builder.mutation({
            query: (id: string) => ({
                url: `/event/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['event']
        }),
        myEvent: builder.query({
            query: (params) => ({
                url: '/event/my-events',
                method: 'GET',
                params
            }),
            providesTags: ['event']
        }),
        createEvent: builder.mutation({
            query: (data) => ({
                url: '/event/create',
                method: 'POST',
                body: data
            })
        }),
        updateEvent: builder.mutation({
            query: (data) => ({
                url: `/event/update/${data?.id}`,
                method: 'PATCH',
                body: data?.formData
            }),
            invalidatesTags:['event']
        })
    })
})
export const { useGetEventsQuery, useGetSingleEventQuery, useMyEventQuery, useCreateEventMutation, useUpdateEventMutation } = eventApis;
