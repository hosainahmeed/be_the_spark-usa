import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: '/user/get-my-profile',
                method: 'GET',
            }),
            providesTags:['profile']
        }),
        updateProfile: builder.mutation({
            query: (data: any) => ({
                url: '/user/update-profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags:['profile']
        }),
    })
})

export const { useGetMyProfileQuery, useUpdateProfileMutation } = profileApis