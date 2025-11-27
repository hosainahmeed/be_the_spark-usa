import baseApis from "../baseApis";

const ratingApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        myFeedback: builder.query({
            query: () => ({
                url: '/rating/my-feedback',
                method: 'GET'
            })
        })
    })
})

export const { useMyFeedbackQuery } = ratingApis