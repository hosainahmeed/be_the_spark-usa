import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "",
        headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
    }),
    tagTypes: [],
    endpoints: () => ({}),
});

export default baseApis;
