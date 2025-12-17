import baseApis from "../baseApis";

const clubApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        contactSubmit: builder.mutation({
            query: (data) => ({
                url: '/auth/contact-us',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useContactSubmitMutation } = clubApis