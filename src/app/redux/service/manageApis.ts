import baseApis from "../baseApis";

const manageApis = baseApis.injectEndpoints({
    endpoints: ((builder) => ({
        getTermsAndConditions: builder.query({
            query: () => ({
                url: '/manage/get-terms-conditions',
                method: 'GET'
            }),
            providesTags: ['termsAndConditions']
        }),
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: '/manage/get-privacy-policy',
                method: 'GET'
            }),
            providesTags: ['privacyPolicy']
        }),
        getFaq: builder.query({
            query: () => ({
                url: '/manage/get-faq',
                method: 'GET'
            }),
            providesTags: ['faq']
        }),
    }))
})

export const {
    useGetTermsAndConditionsQuery,
    useGetPrivacyPolicyQuery,
    useGetFaqQuery,
} = manageApis

