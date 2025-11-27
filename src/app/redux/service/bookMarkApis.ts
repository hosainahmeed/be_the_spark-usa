import baseApis from "../baseApis";

const bookmarkApis = baseApis.injectEndpoints({
    endpoints: ((builder) => ({
        myBookmark: builder.query(({
            query: (params) => ({
                url: '/bookmark/my-bookmarks',
                method: 'GET',
                params
            })
        })),
        markAsBookMark: builder.mutation(({
            query: (id) => ({
                url: `/bookmark/add-delete-bookmark/${id}`,
                method: 'POST',
            }),
            invalidatesTags:['event']
        }))
    }))
})

export const { useMyBookmarkQuery, useMarkAsBookMarkMutation } = bookmarkApis