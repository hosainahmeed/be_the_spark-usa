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
            query: (data) => ({
                url: '/rating/add-rating',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['rating','event']
        })
    })
})

export const { useMyFeedbackQuery, useGiveRatingMutation } = ratingApis