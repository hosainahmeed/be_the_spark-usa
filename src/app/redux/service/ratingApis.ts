import baseApis from "../baseApis";

const ratingApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        myFeedback: builder.query({
            query: () => ({
                url: '/rating/my-feedback',
                method: 'GET'
            }),
            providesTags: ['rating']
        }),
        giveRating: builder.mutation({
            query: () => ({
                url: '/rating/add-rating',
                method: 'POST'
            }),
            invalidatesTags: ['rating']
        })
    })
})

export const { useMyFeedbackQuery, useGiveRatingMutation } = ratingApis