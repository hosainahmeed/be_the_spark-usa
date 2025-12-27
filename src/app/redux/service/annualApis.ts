import baseApis from "../baseApis"

const annualApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAnnual: builder.query({
            query: () => ({
                url: '/annual-access-fee',
                method: 'GET',
            })
        }),
        purchaseAnnual: builder.mutation({
            query: () => ({
                url: '/annual-access-fee/purchase',
                method: 'POST',
            })
        }),
    })
})

export const { useGetAnnualQuery, usePurchaseAnnualMutation } = annualApis