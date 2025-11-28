import baseApis from "../baseApis";

const organizerRatingApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getRating: builder.query({
            query: () => ({
                url: '/organizer/organizer-rating',
                method: 'GET',
            })
        })
    })
})

export const { useGetRatingQuery } = organizerRatingApis