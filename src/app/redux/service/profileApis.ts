import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: '/user/get-my-profile',
                method: 'GET',
            }),
        })
    })
})

export const { useGetMyProfileQuery } = profileApis