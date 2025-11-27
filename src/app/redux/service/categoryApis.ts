import baseApis from "../baseApis";

const categoryApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (params) => ({
                url: '/category/all-categories',
                method: 'GET',
                params
            }),
            providesTags: ['category']
        }),
        deleteCategory: builder.mutation({
            query: (id: string) => ({
                url: `/category/delete-category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category']
        }),
        createCategory: builder.mutation({
            query: (data: any) => ({
                url: '/category/create-category',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['category']
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }: { id: string, data: any }) => ({
                url: `/category/update-category/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['category']
        })
    })
})

export const { useGetCategoryQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation } = categoryApis